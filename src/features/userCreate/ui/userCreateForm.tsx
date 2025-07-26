import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { api } from "@shared/api/axios";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Checkbox,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";

const employmentOptions = ["Frontend", "Backend", "QA", "Design"];

const schema = Yup.object().shape({
  name: Yup.string().max(64).required("Обязательное поле"),
  surName: Yup.string().max(64).required("Обязательное поле"),
  password: Yup.string().required("Введите пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
  fullName: Yup.string().max(130).required(),
  email: Yup.string()
    .email("Неверный формат email")
    .required("Обязательное поле"),
  birthDate: Yup.date().nullable(),
  telephone: Yup.string()
    .matches(/^\+7\d{10}$/, "Формат: +7XXXXXXXXXX")
    .nullable(),
  employment: Yup.string().nullable(),
  userAgreement: Yup.boolean(),
});

export const UserCreateForm = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        name: "",
        surName: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        email: "",
        birthDate: "",
        telephone: "",
        employment: "",
        userAgreement: false,
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        const payload = {
          ...values,
          birthDate: values.birthDate
            ? new Date(values.birthDate).toISOString()
            : undefined,
          telephone: values.telephone || undefined,
          employment: values.employment || "",
          userAgreement: Boolean(values.userAgreement),
        };

        if ("confirmPassword" in payload) {
          delete (payload as { confirmPassword?: string }).confirmPassword;
        }

        try {
          await api.post("/v1/users", payload);
          message.success("Пользователь создан");
          navigate("/");
        } catch (e) {
          const err = e as { response?: { data?: { message?: string } } };
          message.error(err.response?.data?.message || "Ошибка при создании");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        isSubmitting,
      }) => {
        const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
          setFieldValue("fullName", `${e.target.value} ${values.surName}`);
        };

        const handleSurnameChange = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          handleChange(e);
          setFieldValue("fullName", `${values.name} ${e.target.value}`);
        };

        return (
          <Form className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl font-sans">
            <Typography.Title
              level={3}
              className="mb-8 text-center !text-gray-900 !font-bold"
            >
              Создание пользователя (Formik)
            </Typography.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Field
                  name="name"
                  as={Input}
                  placeholder="Имя"
                  onChange={handleNameChange}
                  className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>
              <div>
                <Field
                  name="surName"
                  as={Input}
                  placeholder="Фамилия"
                  onChange={handleSurnameChange}
                  className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                />
                {touched.surName && errors.surName && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.surName}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <Field
                  name="fullName"
                  as={Input}
                  placeholder="Полное имя"
                  className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                />
                {touched.fullName && errors.fullName && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <Field
                  name="email"
                  as={Input}
                  placeholder="Email"
                  className="w-full !border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                <div>
                  <DatePicker
                    onChange={(date) =>
                      setFieldValue(
                        "birthDate",
                        date ? date.toISOString() : undefined
                      )
                    }
                    className="w-full !border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                    placeholder="Дата рождения"
                  />
                  {touched.birthDate && errors.birthDate && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.birthDate}
                    </div>
                  )}
                </div>
                <div>
                  <Field
                    name="telephone"
                    as={Input}
                    placeholder="Телефон +7..."
                    className="w-full !border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                  />
                  {touched.telephone && errors.telephone && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.telephone}
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2">
                <Select
                  placeholder="Должность"
                  value={values.employment || undefined}
                  onChange={(val) => setFieldValue("employment", val)}
                  className="w-full"
                >
                  {employmentOptions.map((opt) => (
                    <Select.Option key={opt} value={opt}>
                      {opt}
                    </Select.Option>
                  ))}
                </Select>
                {touched.employment && errors.employment && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.employment}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center mb-6">
              <Checkbox
                checked={values.userAgreement}
                onChange={(e) =>
                  setFieldValue("userAgreement", e.target.checked)
                }
                className="mr-2"
              >
                Согласие на обработку данных
              </Checkbox>
              {touched.userAgreement && errors.userAgreement && (
                <div className="text-red-500 text-sm ml-2">
                  {errors.userAgreement}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Field
                  name="password"
                  type="password"
                  as={Input.Password}
                  placeholder="Пароль"
                  className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  as={Input.Password}
                  placeholder="Подтверждение пароля"
                  className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
              className="!bg-gray-900 !border-none !text-white !font-semibold !rounded-lg !py-2 !mt-8"
            >
              Создать
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

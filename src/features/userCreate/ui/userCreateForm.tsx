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
          employment: values.employment || undefined,
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
          <Form className="max-w-xl mx-auto p-8 bg-white shadow rounded space-y-4">
            <Typography.Title level={3}>Создание пользователя</Typography.Title>

            <div>
              <Field
                name="name"
                as={Input}
                placeholder="Имя"
                onChange={handleNameChange}
              />
              {touched.name && errors.name && (
                <div className="text-red-500">{errors.name}</div>
              )}
            </div>

            <div>
              <Field
                name="surName"
                as={Input}
                placeholder="Фамилия"
                onChange={handleSurnameChange}
              />
              {touched.surName && errors.surName && (
                <div className="text-red-500">{errors.surName}</div>
              )}
            </div>

            <div>
              <Field name="fullName" as={Input} placeholder="Полное имя" />
              {touched.fullName && errors.fullName && (
                <div className="text-red-500">{errors.fullName}</div>
              )}
            </div>

            <div>
              <Field name="email" as={Input} placeholder="Email" />
              {touched.email && errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>

            <div>
              <Field
                name="password"
                type="password"
                as={Input.Password}
                placeholder="Пароль"
              />
              {touched.password && errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>

            <div>
              <Field
                name="confirmPassword"
                type="password"
                as={Input.Password}
                placeholder="Подтверждение пароля"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="text-red-500">{errors.confirmPassword}</div>
              )}
            </div>

            <div>
              <DatePicker
                onChange={(date) =>
                  setFieldValue(
                    "birthDate",
                    date ? date.toISOString() : undefined
                  )
                }
                className="w-full"
              />
            </div>

            <div>
              <Field name="telephone" as={Input} placeholder="Телефон +7..." />
              {touched.telephone && errors.telephone && (
                <div className="text-red-500">{errors.telephone}</div>
              )}
            </div>

            <div>
              <Select
                className="w-full"
                placeholder="Должность"
                value={values.employment || undefined}
                onChange={(val) => setFieldValue("employment", val)}
              >
                {employmentOptions.map((opt) => (
                  <Select.Option key={opt} value={opt}>
                    {opt}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div>
              <Checkbox
                checked={values.userAgreement}
                onChange={(e) =>
                  setFieldValue("userAgreement", e.target.checked)
                }
              >
                Согласие на обработку данных
              </Checkbox>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
            >
              Создать
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

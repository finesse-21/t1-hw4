import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@shared/api/axios";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Checkbox,
  Typography,
  message,
  Spin,
} from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

interface EditUser {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
  id?: string;
}

const employmentOptions = ["Frontend", "Backend", "QA", "Design"];

const schema = Yup.object().shape({
  name: Yup.string().max(64).required(),
  surName: Yup.string().max(64).required(),
  fullName: Yup.string().max(130).required(),
  birthDate: Yup.date().nullable(),
  telephone: Yup.string()
    .matches(/^\+7\d{10}$/, "Формат: +7XXXXXXXXXX")
    .nullable(),
  employment: Yup.string().nullable(),
  userAgreement: Yup.boolean(),
});

export const UserEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<EditUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/v1/users/${id}`)
      .then((res) => {
        const data = res.data;
        setUser({
          ...data,
          birthDate: data.birthDate,
        });
      })
      .catch(() => {
        message.error("Не удалось загрузить пользователя");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading || !user)
    return <Spin className="block m-auto mt-10" size="large" />;

  return (
    <Formik
      initialValues={user}
      enableReinitialize
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const payload = {
            ...values,
            birthDate: values.birthDate
              ? new Date(values.birthDate)
              : undefined,
          };

          delete (payload as Partial<EditUser>).email;
          delete (payload as Partial<EditUser>).id;

          await api.patch(`/v1/users/${id}`, payload);
          message.success("Пользователь обновлён");
          navigate("/");
        } catch {
          message.error("Ошибка при сохранении");
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
              Редактирование пользователя
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
                  className="w-full !border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
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
                  disabled
                  className="w-full !border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base !opacity-70"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                <div>
                  <DatePicker
                    className="w-full !border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
                    value={
                      values.birthDate ? dayjs(values.birthDate) : undefined
                    }
                    onChange={(date) =>
                      setFieldValue(
                        "birthDate",
                        date ? date.toDate() : undefined
                      )
                    }
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
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              block
              className="!bg-gray-900 !border-none !text-white !font-semibold !rounded-lg !py-2 !mt-8"
            >
              Сохранить
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

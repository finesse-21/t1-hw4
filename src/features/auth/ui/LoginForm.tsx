import { Button, Input, Typography } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@shared/lib/hooks";
import { loginThunk } from "../model/loginThunk";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string().required("Введите пароль"),
});

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const result = await dispatch(loginThunk(values));
        setSubmitting(false);

        if (loginThunk.rejected.match(result)) {
          setErrors({ password: "Неверный логин или пароль" });
        } else {
          navigate("/");
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="max-w-sm mx-auto space-y-6 p-8 bg-white shadow-lg mt-24 rounded-xl font-sans">
          <Typography.Title
            level={3}
            className="text-center !mb-6 !text-gray-900 !font-bold"
          >
            Вход
          </Typography.Title>
          <div>
            <Field
              name="email"
              as={Input}
              placeholder="Email"
              className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <Field
              name="password"
              type="password"
              as={Input.Password}
              placeholder="Пароль"
              className="!border-gray-200 !bg-gray-100 !rounded-lg !py-2 !px-4 !text-base"
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isSubmitting}
            className="!bg-gray-900 !border-none !text-white !font-semibold !rounded-lg !py-2"
          >
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

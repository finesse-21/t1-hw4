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
        <Form className="max-w-sm mx-auto space-y-4 p-8 bg-white shadow mt-20 rounded">
          <Typography.Title level={3} className="text-center">
            Вход
          </Typography.Title>
          <div>
            <Field name="email" as={Input} placeholder="Email" />
            {errors.email && touched.email && (
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
            {errors.password && touched.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
          <Button htmlType="submit" type="primary" block loading={isSubmitting}>
            Войти
          </Button>
        </Form>
      )}
    </Formik>
  );
};

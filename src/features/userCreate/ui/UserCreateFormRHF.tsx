import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { api } from "@shared/api/axios";

const employmentOptions = ["Frontend", "Backend", "QA", "Design"];

const schema = Yup.object().shape({
  name: Yup.string().max(64).required("Обязательное поле"),
  surName: Yup.string().max(64).required("Обязательное поле"),
  password: Yup.string().required("Введите пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Подтвердите пароль"),
  fullName: Yup.string().max(130).required("Обязательное поле"),
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  birthDate: Yup.date().nullable().optional(),
  telephone: Yup.string()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\+7\d{10}$/, "Формат: +7XXXXXXXXXX")
    .nullable()
    .optional(),
  employment: Yup.string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .optional(),
  userAgreement: Yup.boolean().optional(),
});

type FormValues = Yup.InferType<typeof schema>;

export const UserCreateFormRHF = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      surName: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      email: "",
      birthDate: null,
      telephone: "",
      employment: null,
      userAgreement: false,
    },
  });

  const name = watch("name");
  const surName = watch("surName");

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      birthDate: values.birthDate ? new Date(values.birthDate) : undefined,
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-8 bg-white shadow rounded space-y-4"
    >
      <Typography.Title level={3}>Создание пользователя (RHF)</Typography.Title>

      <div>
        <Input
          placeholder="Имя"
          value={name}
          onChange={(e) => {
            const newName = e.target.value;
            setValue("name", newName, { shouldValidate: true });
            setValue("fullName", `${newName} ${surName}`.trim(), {
              shouldValidate: true,
            });
          }}
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>

      <div>
        <Input
          placeholder="Фамилия"
          value={surName}
          onChange={(e) => {
            const newSurName = e.target.value;
            setValue("surName", newSurName, { shouldValidate: true });
            setValue("fullName", `${name} ${newSurName}`.trim(), {
              shouldValidate: true,
            });
          }}
        />
        {errors.surName && (
          <div className="text-red-500">{errors.surName.message}</div>
        )}
      </div>

      <div>
        <Input
          placeholder="Полное имя"
          value={watch("fullName")}
          className="w-full"
          onChange={(e) =>
            setValue("fullName", e.target.value, { shouldValidate: true })
          }
        />
        {errors.fullName && (
          <div className="text-red-500">{errors.fullName.message}</div>
        )}
      </div>

      <div>
        <Input
          placeholder="Email"
          {...register("email")}
          onChange={(e) => {
            setValue("email", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>

      <div>
        <Input.Password
          placeholder="Пароль"
          {...register("password")}
          onChange={(e) => {
            setValue("password", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        {errors.password?.message && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>

      <div>
        <Input.Password
          placeholder="Подтверждение пароля"
          {...register("confirmPassword")}
          onChange={(e) => {
            setValue("confirmPassword", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        {errors.confirmPassword?.message && (
          <div className="text-red-500">{errors.confirmPassword.message}</div>
        )}
      </div>

      <div>
        <DatePicker
          onChange={(date) =>
            setValue("birthDate", date ? date.toDate() : null)
          }
          className="w-full"
        />
        {errors.birthDate && (
          <div className="text-red-500">{errors.birthDate.message}</div>
        )}
      </div>

      <div>
        <Input
          placeholder="Телефон +7..."
          {...register("telephone")}
          onChange={(e) => {
            setValue("telephone", e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        {errors.telephone && (
          <div className="text-red-500">{errors.telephone.message}</div>
        )}
      </div>

      <div>
        <Select
          className="w-full"
          placeholder="Должность (необязательно)"
          allowClear
          onChange={(value) =>
            setValue("employment", value === undefined ? null : value, {
              shouldValidate: true,
            })
          }
          value={watch("employment") ?? undefined}
        >
          {employmentOptions.map((opt) => (
            <Select.Option key={opt} value={opt}>
              {opt}
            </Select.Option>
          ))}
        </Select>
        {errors.employment && (
          <div className="text-red-500">{errors.employment.message}</div>
        )}
      </div>

      <div>
        <Checkbox onChange={(e) => setValue("userAgreement", e.target.checked)}>
          Согласие на обработку данных
        </Checkbox>
        {errors.userAgreement && (
          <div className="text-red-500">{errors.userAgreement.message}</div>
        )}
      </div>

      <Button type="primary" htmlType="submit" loading={isSubmitting} block>
        Создать
      </Button>
    </form>
  );
};

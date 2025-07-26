import { useState } from "react";
import { UserCreateForm } from "@features/userCreate/ui/userCreateForm";
import { UserCreateFormRHF } from "@features/userCreate/ui/UserCreateFormRHF";
import { Button } from "antd";

export const UserCreatePage = () => {
  const [useRHF, setUseRHF] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex gap-4 mb-6">
        <Button
          type={!useRHF ? "primary" : "default"}
          onClick={() => setUseRHF(false)}
        >
          Formik
        </Button>
        <Button
          type={useRHF ? "primary" : "default"}
          onClick={() => setUseRHF(true)}
        >
          React Hook Form
        </Button>
      </div>
      {useRHF ? <UserCreateFormRHF /> : <UserCreateForm />}
    </div>
  );
};

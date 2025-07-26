import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { useEffect } from "react";
import { fetchUsers, deleteUser } from "@entities/user/model/usersThunk";
import { Table, Button, Space, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "@entities/user/types";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteUser(id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "ФИО",
      dataIndex: "fullName",
    },
    {
      title: "Действия",
      render: (_: unknown, record: User) => (
        <Space>
          <Button onClick={() => navigate(`/user/edit/${record.id}`)}>
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить пользователя?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="id"
      pagination={false}
    />
  );
};

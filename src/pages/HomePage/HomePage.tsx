import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "@entities/user/model/usersThunk";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Input,
  Typography,
  Empty,
} from "antd";
import { useNavigate } from "react-router-dom";
import type { User } from "@entities/user/types";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading } = useAppSelector((state) => state.user);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteUser(id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      render: (id: string) => (
        <span className="bg-gray-100 px-3 py-1 rounded-md font-medium text-gray-600 text-sm">
          {id}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => (
        <span className="font-medium text-gray-900">{email}</span>
      ),
    },
    {
      title: "ФИО",
      dataIndex: "fullName",
      render: (fullName: string) => (
        <span className="text-gray-700">{fullName}</span>
      ),
    },
    {
      title: "Действия",
      render: (_: unknown, record: User) => (
        <Space wrap>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/user/edit/${record.id}`)}
            className="!bg-gray-100 !border-none !text-gray-900 !font-medium !rounded-md hover:!bg-gray-200 transition !px-2 !py-1"
            size="small"
          >
            <span className="hidden sm:inline">Редактировать</span>
          </Button>
          <Popconfirm
            title={
              <span className="text-lg font-semibold text-gray-900">
                Удалить пользователя?
              </span>
            }
            onConfirm={() => handleDelete(record.id)}
            okText="Да"
            cancelText="Нет"
            overlayClassName="!rounded-2xl !bg-white !shadow-lg"
            okButtonProps={{
              className:
                "!bg-gray-900 !border-none !text-white !font-semibold !rounded-lg !py-2 !px-6 hover:!bg-gray-800 transition",
            }}
            cancelButtonProps={{
              className:
                "!bg-gray-100 !text-gray-900 !rounded-lg !py-2 !px-6 hover:!bg-gray-200 transition",
            }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              className="!bg-white !border !border-gray-200 !text-red-600 !font-medium !rounded-lg hover:!bg-red-50 transition !px-2 !py-1"
              size="small"
            >
              <span className="hidden sm:inline">Удалить</span>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2 sm:py-10 sm:px-4 font-sans">
      <div className="bg-white shadow-lg rounded-xl max-w-full sm:max-w-4xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col gap-4 sm:gap-6 mb-7">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Typography.Title
              level={3}
              className="!mb-0 !text-gray-900 !font-bold !tracking-tight !text-lg sm:!text-2xl"
            >
              Список пользователей
            </Typography.Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/user/create")}
              className="w-full sm:w-auto !bg-gray-900 !border-none !text-white !font-semibold !rounded-md !px-4 sm:!px-6 !py-2 hover:!bg-gray-800 transition"
            >
              <span className="hidden sm:inline">Добавить пользователя</span>
              <span className="sm:hidden">Добавить</span>
            </Button>
          </div>
          <Input
            placeholder="Поиск по email или ФИО"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            className="w-full sm:!max-w-xs !border-gray-200 !bg-gray-100 !rounded-md !py-2 !px-4 !text-base"
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              className:
                "[&_.ant-pagination-item]:!bg-gray-100 [&_.ant-pagination-item]:!border-none [&_.ant-pagination-item]:!rounded-lg [&_.ant-pagination-item]:!text-gray-900 [&_.ant-pagination-item-active]:!bg-gray-900 [&_.ant-pagination-item-active]:!text-white [&_.ant-pagination-item:hover]:!bg-gray-200 [&_.ant-pagination-item:hover]:!text-black [&_.ant-pagination-item-active]:!bg-gray-900 [&_.ant-pagination-item-active]:!text-white [&_.ant-pagination-item-link]:!text-gray-900 [&_.ant-pagination-prev]:!rounded-lg [&_.ant-pagination-next]:!rounded-lg [&_.ant-pagination-prev]:!bg-gray-100 [&_.ant-pagination-next]:!bg-gray-100 [&_.ant-pagination-prev]:!border-none [&_.ant-pagination-next]:!border-none [&_.ant-pagination-prev]:!text-gray-900 [&_.ant-pagination-next]:!text-gray-900 [&_.ant-pagination-disabled]:!opacity-50",
            }}
            bordered={false}
            locale={{
              emptyText: (
                <Empty
                  description="Нет пользователей"
                  className="text-gray-400"
                />
              ),
            }}
            className="rounded-lg overflow-hidden bg-white text-base min-w-[320px]"
          />
        </div>
      </div>
    </div>
  );
};

import { Table, Row, Col, Tooltip, User, Text, Modal } from "@nextui-org/react";
import { IconButton } from "../icons/IconButton";
import { EyeIcon } from "../icons/EyeIcon";
import { useEffect, useState } from "react";
import { Contact, fetchContacts } from "../api/contact";

export default function Contacts() {
  const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "ADDRESS", uid: "address" },
    { name: "PHONE", uid: "phone" },
    { name: "COMPANY", uid: "company" },
    { name: "VIEW", uid: "view" },
  ];
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedUser, setSelectedUser] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContacts()
      .then((data) => setContacts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleViewLocation = (user: Contact) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            squared
            src={
              "https://gravatar.com/avatar/105833b0013789c8585fc40865317ec3?s=400&d=robohash&r=x"
            }
            name={cellValue}
          >
            <span className="text-blue-500 font-semibold">
              Username: {user.username}
            </span>
            <br></br>
            <span className="text-grey font-semibold">Email: {user.email}</span>
          </User>
        );
      case "address":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {user.suite}, {user.street}, {user.city}
              </Text>
            </Row>
            <Row>
              <Text b size={12} css={{ color: "$accents7" }}>
                ZIP Code: {user.zip}
              </Text>
            </Row>
          </Col>
        );
      case "phone":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "company":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {user.company}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ color: "$link" }}>
                {user.website}
              </Text>
            </Row>
          </Col>
        );
      case "view":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="View Location">
                <IconButton onClick={() => handleViewLocation(user)}>
                  <EyeIcon size={20} fill="#FF0080" height={20} width={20} />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <>
      <Table
        sticked
        striped
        lined
        aria-label="Example table with custom cells"
        selectionMode="multiple"
        css={{
          height: "auto",
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              css={column.uid === "name" ? { px: "$12" } : { px: "$8" }}
              key={column.uid}
              hideHeader={column.uid === "s"}
              align={column.uid === "view" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={contacts}>
          {(item) => (
            <Table.Row>
              {(columnKey: any) => (
                <Table.Cell css={{ px: "$8" }}>
                  {renderCell(item, columnKey)}
                </Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={5}
          total={contacts.length / 5}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedUser && (
          <div>
            <Text
              h1
              className="py-6 text-2xl"
              css={{
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
              }}
              weight="bold"
            >
              Location for {selectedUser.name}
            </Text>
            <iframe
              title="Google Maps"
              width="100%"
              height="400"
              src={`https://maps.google.com/maps?q=${selectedUser.lat},${selectedUser.lng}&output=embed`}
            ></iframe>
          </div>
        )}
      </Modal>
    </>
  );
}

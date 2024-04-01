import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Card from "@material-ui/core/Card";
import Icon from "@material-ui/core/Icon";
import Swal from "sweetalert2";
import { fetchUsers } from "api";
import RowUser from "components/Table/rowUser";
import EmptyContent from "components/EmptyContent";
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import TableLayout from "layouts/Tables";
import colors from "assets/theme/base/colors";
import { useCacaoContext } from "context";
import UsersModal from "./modal";

const Users = () => {
  const [cookies] = useCookies(["cacao"]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [controller] = useCacaoContext();
  const token = cookies.cacao;
  const getUsers = async () => {
    try {
      const list = await fetchUsers(token);
      setLoading(false);
      setUsers(list.filter((item) => item._id !== controller.user._id));
    } catch (e) {
      setLoading(false);
      setUsers([]);
    }
  };
  useEffect(async () => {
    await getUsers();
  }, []);
  if (loading) return <p>Loading</p>;
  return (
    <Card>
      <SuiBox
        p={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <SuiTypography variant="h6" fontWeight="medium">
          Usuarios
        </SuiTypography>
        <SuiButton
          onClick={() => setModal(true)}
          variant="gradient"
          buttonColor="greenDark"
        >
          <Icon className="font-bold">add</Icon>
          &nbsp;Nuevo usuario
        </SuiButton>
      </SuiBox>
      {users.length < 1 ? (
        <EmptyContent message="Aún no hay usuarios. Agregue uno" />
      ) : (
        <TableLayout
          columns={[
            { accessor: "nombre", align: "left", Header: "nombre" },
            { accessor: "rol", align: "left", Header: "rol" },
            { accessor: "documento", align: "left", Header: "documento" },
            { accessor: "telefono", align: "left", Header: "teléfono" },
            { accessor: "action", align: "center", Header: "editar" },
          ]}
          rows={users.map((data) => ({
            nombre: <RowUser email={data.email} name={data.name} />,
            rol: <RowUser.Rol rol={data.rol.description} />,
            documento: <RowUser.Rol rol={data.document.toString()} />,
            telefono: <RowUser.Rol rol={data.mobile.toString()} />,
            action: (
              <RowUser.Actions
                primaryAction={() => {
                  setUser(data);
                  setEditModal(true);
                }}
              />
            ),
          }))}
        />
      )}
      {modal && (
        <UsersModal.Add
          cb={() =>
            Swal.fire({
              title: "Usuario creado!",
              icon: "success",
              confirmButtonText: "Ok!",
              confirmButtonColor: colors.greenDark.main,
            }).then(async () => {
              await getUsers();
            })
          }
          token={cookies.cacao}
          modal={modal}
          setModal={() => setModal(false)}
        />
      )}
      {editModal && (
        <UsersModal.Edit
          cb={() =>
            Swal.fire({
              title: "Usuario modificado",
              icon: "success",
              confirmButtonText: "Ok!",
              confirmButtonColor: colors.greenDark.main,
            }).then(async () => {
              await getUsers();
            })
          }
          data={user}
          token={cookies.cacao}
          modal={editModal}
          setModal={() => setEditModal(false)}
        />
      )}
    </Card>
  );
};

export default Users;

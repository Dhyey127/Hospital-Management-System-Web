import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CommonModal from 'src/components/Modal';
import Container from '@mui/material/Container';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { users } from 'src/_mock/user';
import instance from 'src/api/api';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import UserTableHead from '../user-table-head';
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import PatientForm from './patient-form';
import { applyFilter, emptyRows, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modal, setModal] = useState(false);
  const [patientData, setPatientData] = useState([]);

  const getData = async (rowPerPage) => {
    const data = await instance.post(`/patient/list`, { limit: rowPerPage });
    setPatientData(data.result);
  };

  useEffect(() => {
    getData(rowsPerPage);
  }, [rowsPerPage]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = dataFiltered.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered =
    patientData.length > 0
      ? applyFilter({
          inputData: patientData,
          comparator: getComparator(order, orderBy),
          filterName,
        })
      : [];

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Patients</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setModal(true)}
        >
          New Patients
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'age', label: 'Age' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'contact', label: 'Contact' },
                  { id: 'diagnosis', label: 'Diagnosis' },
                  { id: 'allergies', label: 'Allergies' },
                  { id: 'medication', label: 'Medication' },
                  { id: 'appointment', label: 'Appointment Record' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      id={row._id}
                      key={row.id}
                      name={row.name}
                      age={row.age}
                      gender={row.gender}
                      contact={row.contact}
                      diagnosis={row.diagnosis}
                      allergies={row.allergies}
                      medication={row.medication}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <CommonModal
        open={modal}
        handleClose={() => setModal(false)}
        content={
          <PatientForm handleClose={() => setModal(false)} getData={() => getData(rowsPerPage)} />
        }
      />
    </Container>
  );
}

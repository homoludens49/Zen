import * as React from "react";
//Redux
import { connect } from "react-redux";
import { createExpense, getExpenses } from "../actions/expenses";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function createData(
  name,
  january,
  february,
  march,
  april,
  may,
  june,
  july,
  august,
  september,
  october,
  november,
  december
) {
  return {
    name,
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  };
}

const rows = [
  createData("Salary", 305, 3.7, 67, 4.3),
  createData("Soc. Tax", 305, 3.7, 67, 4.3),
  createData("Income Tax", 305, 3.7, 67, 4.3),
  createData("VSAOI 23,59%", 305, 3.7, 67, 4.3),
  createData("Raw Material", 305, 3.7, 67, 4.3),
  createData("Shipping", 305, 3.7, 67, 4.3),
  createData("Import Tax", 305, 3.7, 67, 4.3),
  createData("VAT 21%", 305, 3.7, 67, 4.3),
  createData("Facebook Adds", 305, 3.7, 67, 4.3),
  createData("Google Adds", 305, 3.7, 67, 4.3),
  createData("Soc. Tax", 305, 3.7, 67, 4.3),
  createData("Income Tax", 305, 3.7, 67, 4.3),
  createData("Interest payment on loan", 305, 3.7, 67, 4.3),
  createData("Loan base payment", 305, 3.7, 67, 4.3),
  createData("Car", 305, 3.7, 67, 4.3),
  createData("Accountancy", 305, 3.7, 67, 4.3),
  createData("Rent", 305, 3.7, 67, 4.3),
  createData("Security", 305, 3.7, 67, 4.3),
  createData("Web page maintanance", 305, 3.7, 67, 4.3),
  createData("Phone", 305, 3.7, 67, 4.3),
  createData("Omniva", 305, 3.7, 67, 4.3),
  createData("DPD", 305, 3.7, 67, 4.3),
  createData("Equipment", 305, 3.7, 67, 4.3),
  createData("Side material", 305, 3.7, 67, 4.3),
  createData("Kommisions", 305, 3.7, 67, 4.3),
  createData("Gas", 305, 3.7, 67, 4.3),
  createData("Other", 305, 3.7, 67, 4.3),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Expense Name",
  },
  {
    id: "january",
    numeric: true,
    disablePadding: false,
    label: "January",
  },
  {
    id: "february",
    numeric: true,
    disablePadding: false,
    label: "February",
  },
  {
    id: "march",
    numeric: true,
    disablePadding: false,
    label: "March",
  },
  {
    id: "april",
    numeric: true,
    disablePadding: false,
    label: "April",
  },
  {
    id: "may",
    numeric: true,
    disablePadding: false,
    label: "May",
  },
  {
    id: "june",
    numeric: true,
    disablePadding: false,
    label: "June",
  },
  {
    id: "july",
    numeric: true,
    disablePadding: false,
    label: "July",
  },
  {
    id: "august",
    numeric: true,
    disablePadding: false,
    label: "August",
  },
  {
    id: "september",
    numeric: true,
    disablePadding: false,
    label: "September",
  },
  {
    id: "october",
    numeric: true,
    disablePadding: false,
    label: "October",
  },
  {
    id: "november",
    numeric: true,
    disablePadding: false,
    label: "November",
  },
  {
    id: "december",
    numeric: true,
    disablePadding: false,
    label: "December",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all expenses",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          2021 Expenses
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const EnhancedTable = ({ createExpense, getExpenses }) => {
  React.useEffect(() => {
    getExpenses();
  }, []);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const months = [
    { label: "january" },
    { label: "february" },
    { label: "march" },
    { label: "april" },
    { label: "may" },
    { label: "june" },
    { label: "july" },
    { label: "august" },
    { label: "september" },
    { label: "october" },
    { label: "november" },
    { label: "december" },
  ];

  const years = [
    { label: "2021" },
    { label: "2022" },
    { label: "2023" },
    { label: "2024" },
    { label: "2025" },
    { label: "2026" },
    { label: "2027" },
    { label: "2028" },
    { label: "2029" },
    { label: "2030" },
  ];

  //create const array of objects with label:Salary Income tax Soc. Tax
  const expenses = [
    { label: "Salary" },
    { label: "Soc. Tax" },
    { label: "Income Tax" },
    { label: "VSAOI 23,59%" },
    { label: "Raw Material" },
    { label: "Shipping" },
    { label: "Import Tax" },
    { label: "VAT 21%" },
    { label: "Facebook Adds" },
    { label: "Google Adds" },
    { label: "Interest payment on loan" },
    { label: "Loan base payment" },
    { label: "Car" },
    { label: "Accountancy" },
    { label: "Rent" },
    { label: "Security" },
    { label: "Web page maintanance" },
    { label: "Phone" },
    { label: "Omniva" },
    { label: "DPD" },
    { label: "Equipment" },
    { label: "Side material" },
    { label: "Kommisions" },
    { label: "Gas" },
    { label: "Other" },
  ];
  const [formData, setFormData] = React.useState({
    expenseName: "",
    vat: true,
    month: "",
    year: "",
    cost: 0,
  });

  const { expenseName, vat, month, year, cost } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id.split("-")[0]]: e.target.innerText,
    });
  };
  const onChangeCost = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createExpense(formData);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.january}</TableCell>
                      <TableCell align="right">{row.february}</TableCell>
                      <TableCell align="right">{row.march}</TableCell>
                      <TableCell align="right">{row.april}</TableCell>
                      <TableCell align="right">{row.may}</TableCell>
                      <TableCell align="right">{row.june}</TableCell>
                      <TableCell align="right">{row.july}</TableCell>
                      <TableCell align="right">{row.august}</TableCell>
                      <TableCell align="right">{row.september}</TableCell>
                      <TableCell align="right">{row.november}</TableCell>
                      <TableCell align="right">{row.december}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="on"
        onSubmit={(e) => onSubmit(e)}
      >
        <div>
          <Autocomplete
            disablePortal
            id="expenseName"
            options={expenses}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Expence"
                name="expenseName"
                value={expenseName}
              />
            )}
            onChange={(e) => onChange(e)}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                onChange={() => {
                  setFormData({
                    ...formData,
                    vat: !vat,
                  });
                }}
              />
            }
            label="VAT 21%"
          />
          <Autocomplete
            disablePortal
            id="month"
            options={months}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Month" name="month" value={month} />
            )}
            onChange={(e) => onChange(e)}
          />
          <Autocomplete
            disablePortal
            id="year"
            options={years}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Year" name="year" value={year} />
            )}
            onChange={(e) => onChange(e)}
          />
          <TextField
            id="cost"
            label="Number"
            type="number"
            name="cost"
            value={cost}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onChangeCost(e)}
          />
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </div>
      </Box>
    </Box>
  );
};

EnhancedTable.propTypes = {
  createExpense: PropTypes.func.isRequired,
  getExpenses: PropTypes.func.isRequired,
};

export default connect(null, { createExpense , getExpenses})(EnhancedTable);

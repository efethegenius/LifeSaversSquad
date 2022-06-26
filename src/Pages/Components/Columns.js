import { format } from "date-fns";
import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Date Joined",
    Footer: "Date Joined",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/mm/yyyy");
    },
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "FirstName",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "LastName",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "Email",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "PhoneNumber",
  },
  {
    Header: "State",
    Footer: "State",
    accessor: "State",
  },
  {
    Header: "City",
    Footer: "City",
    accessor: "City",
  },
  {
    Header: "Street",
    Footer: "Street",
    accessor: "Street",
  },
  {
    Header: "Best Contact Time",
    Footer: "Best Contact Time",
    accessor: "Contact_Time",
  },
  {
    Header: "Previously Volunteered",
    Footer: "Previously Volunteered",
    accessor: "Previously_Volunteered_Here",
  },
  {
    Header: "Heard About Us",
    Footer: "Heard About Us",
    accessor: "Hear_About_Us",
  },
  {
    Header: "Available Days",
    Footer: "Available Days",
    accessor: "Available_Days",
  },
  {
    Header: "Additional Comments",
    Footer: "Additional Comments",
    accessor: "Additional_Comments",
  },
];

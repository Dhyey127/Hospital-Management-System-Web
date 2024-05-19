import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/departments/view';

// ----------------------------------------------------------------------

export default function DepartmentPage() {
  return (
    <>
      <Helmet>
        <title> Department </title>
      </Helmet>

      <UserView />
    </>
  );
}

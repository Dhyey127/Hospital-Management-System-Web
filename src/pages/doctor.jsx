import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/doctor/view';

// ----------------------------------------------------------------------

export default function DoctorPage() {
  return (
    <>
      <Helmet>
        <title> Doctors </title>
      </Helmet>

      <UserView />
    </>
  );
}

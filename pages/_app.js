import '@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css'; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import '@fullcalendar/timegrid/main.css'; // @fullcalendar/timegrid is a direct import
import 'draft-js/dist/Draft.css';
import 'react-notifications/lib/notifications.css';
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import 'react-markdown-editor-lite/lib/index.css';
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <ProtectRoute> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </ProtectRoute> */}
    </AuthProvider>
  );
}

export default MyApp;
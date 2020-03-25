import { useAuth } from "react-use-auth";
import useSWR from "swr";
import Spinner from "react-bootstrap/Spinner";
import { fetchWithToken } from "../utils/fetch";
import Layout from "../components/Layout";
import AuthenticatedContent from "../components/AuthenticatedContent";

function AuthDetails() {
  const { authResult } = useAuth();
  const { data } = useSWR(
    () => ["/api/info", authResult.accessToken],
    fetchWithToken
  );

  if (!data) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      You're logged in! This is the information that the server knows about you:
      <pre>{JSON.stringify(data, null, "\t")}</pre>
    </div>
  );
}

function HomePage() {
  return (
    <Layout>
      <AuthenticatedContent>
        <AuthDetails />
      </AuthenticatedContent>
    </Layout>
  );
}

export default HomePage;

import axios from "@/axios/axios";
import BandDashboard from "@/components/band/BandDashboard";
import { ENDPOINTS } from "@/utils/constants";

export default async function BandDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const band = (await axios.get(`${ENDPOINTS.BAND}/${id}`)).data;

  return (
    <>
      <BandDashboard band={band} />
    </>
  );
}

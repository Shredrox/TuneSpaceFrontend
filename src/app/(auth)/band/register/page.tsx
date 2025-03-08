import axios from "@/axios/axios";
import BandRegistrationForm from "@/components/band/BandRegistrationForm";

export default async function Page() {
  const countryData = await axios.get(
    "https://countriesnow.space/api/v0.1/countries"
  );

  return (
    <div className="text-white flex justify-center items-center h-screen flex-col gap-4">
      <h2 className="form-h2 white-98 text-3xl">Band Registration</h2>
      <BandRegistrationForm locationData={countryData.data} />
    </div>
  );
}

import AccessForm from "@/components/auth/AccessForm";

const Auth = () => {
  return (
    <div className="text-white flex justify-center items-center h-screen flex-col gap-4">
      <h1 className="text-6xl font-medium">TuneSpace</h1>
      <AccessForm />
    </div>
  );
};

export default Auth;

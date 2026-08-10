import { useNavigate } from "react-router";

export function HomePage() {
  const navigate = useNavigate();
  navigate("/informativo");

  return <></>;
}

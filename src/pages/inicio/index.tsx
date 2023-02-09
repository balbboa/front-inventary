// Next
import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
// Cookies
import { parseCookies } from "nookies";
// Layout
import { FaCartPlus } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaHammer } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import Layout from "../../components/Layout";
import StatsCard from "../../components/StatsCard";

const Home = () => {
  return (
    <Layout props={{ title: "Início" }}>
      Bem-vindo ao sistema,
      <Flex flexDirection={"row"}>
        <Flex flexDirection={"column"}>
          <StatsCard
            icon={<FaUniversity size={"2rem"} />}
            title={"Cadastro de unidades"}
            path={"/cadastrar-unidades"}
          />
          <StatsCard
            icon={<FaCartPlus size={"2rem"} />}
            title={"Cadastro de items"}
            path={"/cadastrar-items"}
          />
          <StatsCard
            icon={<FaHouseUser size={"2rem"} />}
            title={"Cadastro de imóvel"}
            path={"/cadastrar-imoveis"}
          />
          <StatsCard
            icon={<FaCartPlus size={"2rem"} />}
            title={"Cadastro de serviços"}
            path={"/cadastrar-servicos"}
          />
        </Flex>
        <Flex flexDirection={"column"}>
          <StatsCard
            icon={<FaHammer size={"2rem"} />}
            title={"Cadastro de fabricantes"}
            path={"/cadastrar-fabricantes"}
          />
          <StatsCard
            icon={<FaLaptop size={"2rem"} />}
            title={"Cadastro de modelos"}
            path={"/cadastrar-modelos"}
          />
          <StatsCard
            icon={<FaLaptop size={"2rem"} />}
            title={"Cadastro de grupos"}
            path={"/cadastrar-grupos"}
          />
          <StatsCard
            icon={<FaLaptop size={"2rem"} />}
            title={"Cadastro de fornecedores"}
            path={"/cadastrar-fornecedores"}
          />
          <StatsCard
            icon={<FaLaptop size={"2rem"} />}
            title={"Cadastro de tipos de serviço"}
            path={"/cadastrar-tipos-servico"}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);

  // Verifica se o usuário está logado
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

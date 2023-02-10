// Next
import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
// Cookies
import { parseCookies } from "nookies";
// Layout
import { FaCartPlus } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import Layout from "../../components/Layout";
import StatsCard from "../../components/StatsCard";

// Componente principal
const CadastrarDemandas = () => {
  return (
    <Layout props={{ title: "Cadastro de demandas" }}>
      <Heading
        color={useColorModeValue("gray.700", "white")}
        fontSize={"2xl"}
        fontFamily={"body"}
        m={5}
      >
        Cadastro de demandas
      </Heading>
      <Flex flexDirection={"row"}>
        <StatsCard
          icon={<FaHeadset size={"2rem"} />}
          title={"Cadastro de demanda de serviços"}
          path={"cadastrar-demanda/cadastrar-demanda-servicos"}
        />
        <StatsCard
          icon={<FaCartPlus size={"2rem"} />}
          title={"Cadastro de demanda de itens"}
          path={"cadastrar-demanda/cadastrar-demanda-itens"}
        />
      </Flex>
    </Layout>
  );
};

export default CadastrarDemandas;

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

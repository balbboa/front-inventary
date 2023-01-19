// Next
import {
  Box,
  Flex,
  Stat,
  StatLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Router from "next/router";
// Cookies
import { parseCookies } from "nookies";
import { ReactNode } from "react";
// Layout
import { FaCartPlus } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaHammer } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";

import Layout from "../../components/Layout";
import { colors } from "../../utils/colors";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  path: string;
}

const Home = () => {
  const StatsCard = (props: StatsCardProps) => {
    const { title, icon, path } = props;
    return (
      <Stat
        m={"5"}
        width={"sm"}
        cursor={"pointer"}
        px={{ base: 1, md: 5 }}
        py={"5"}
        shadow={"2xl"}
        bg={useColorModeValue("white", colors.grayWolf)}
        rounded={"lg"}
        onClick={() => Router.push(path)
        }
      >
        <Flex justifyContent={"start"} alignItems={"center"}>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontSize={"md"} fontWeight={"medium"}>
              {title}
            </StatLabel>
          </Box>
        </Flex>
      </Stat>
    );
  };

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
            title={"Cadastro de itens"}
            path={"/cadastrar-itens"}
          />
          <StatsCard
            icon={<FaHammer size={"2rem"} />}
            title={"Cadastro de serviços"}
            path={"/cadastrar-servicos"}
          />
          </Flex>
          <Flex flexDirection={"column"}>
            <StatsCard
              icon={<FaHammer size={"2rem"} />}
              title={"Cadastro de demanda de serviços"}
              path={"/cadastrar-demanda-servicos"}
            />
            <StatsCard
              icon={<FaCartPlus size={"2rem"} />}
              title={"Cadastro de demanda de itens"}
              path={"/cadastrar-demanda-itens"}
            />
            <StatsCard
              icon={<FaLaptop size={"2rem"} />}
              title={"Cadastro de modelos"}
              path={"/cadastrar-modelos"}
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

import {
  Box,
  Flex,
  Stat,
  StatLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import Router from "next/router";
import { ReactNode } from "react";
import { colors } from "../utils/colors";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  path: string;
}

const StatsCard = (props: StatsCardProps) => {
  const { title, icon, path } = props;
  return (
    <Stat
      m={"4"}
      width={"xs"}
      cursor={"pointer"}
      px={{ base: 1, md: 5 }}
      py={"4"}
      shadow={"2xl"}
      bg={useColorModeValue("white", colors.grayWolf)}
      rounded={"lg"}
      onClick={() => Router.push(path)}
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

export default StatsCard;

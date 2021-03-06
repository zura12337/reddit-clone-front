//@ts-nocheck
import { Box, Button, Input } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { RiImageLine } from "react-icons/ri";
import { BiLinkAlt } from "react-icons/bi";
import StyledBox from "../common/StyledBox";
import UserPicture from "../user/UserPicture";

export default function NewPostTeaser() {
  const user = useContext(UserContext);

  return user ? (
    <StyledBox mb={5} display="flex" gridGap={2} alignItems="center">
      <Box w="max-content">
        <UserPicture width="40px" isZoomable={false} image={user?.image} />
      </Box>
      <Input
        type="text"
        bg="white"
        _hover={{
          outline: "1",
        }}
        onFocus={() => window.location.replace("/submit")}
        placeholder="Create Post"
      />
      <Button onClick={() => window.location.replace("/submit")} p="5px">
        <RiImageLine size="40px" color="#0272C5" />
      </Button>
      <Button onClick={() => window.location.replace("/submit")} p="5px">
        <BiLinkAlt size="40px" color="#7E8183" />
      </Button>
    </StyledBox>
  ) : (
    <></>
  );
}

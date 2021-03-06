/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";

import Logo from "../assets/reddit-logo.png";
import LoginModal from "./form-modals/LoginModal";
import RegisterModal from "./form-modals/register/RegisterModal";
import Dropdown from "./common/Dropdown";
import {
  DropdownItem,
  DropdownTitle,
  CustomDropdownItem,
  DropdownLink,
} from "./common/DropdownItems";
import { logOut } from "../api/index";

import { BiSearchAlt } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { FaMoon, FaUserCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { UserContext } from "../context/UserContext";

type NavLinkProps = {
  text: string;
  bg: string;
  color: string;
  href?: string;
  [x: string]: any;
};

export default function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const user = useContext(UserContext);

  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("white", "gray.600");
  const color = useColorModeValue("#333", "white");

  return (
    <Flex
      w="100%"
      h="max-content"
      bg={bg}
      px={10}
      py={2}
      justifyContent="space-between"
      position="fixed"
      top="0"
      zIndex={5}
      boxShadow="0 2px 2px rgba(0,0,0,.2)"
    >
      <Link href="/" _focus={{}} _active={{}}>
        <Image src={Logo} alt={"Reddit Logo"} w={100} />
      </Link>
      <InputGroup w="30%" mr="25%">
        <InputLeftElement>
          <BiSearchAlt color={color} size={20} />
        </InputLeftElement>
        <Input
          type="text"
          bg={useColorModeValue("white", "gray.700")}
          placeholder="Search"
        />
      </InputGroup>
      <HStack spacing="25px" alignSelf="center">
        {!user && (
          <>
            <NavLink
              text="Log In"
              bg={useColorModeValue("#fff", "#222223")}
              color={useColorModeValue("#1384D7", "white")}
              borderWidth="1px"
              borderColor={useColorModeValue("#1384D7", "white")}
              onClick={() => setShowLoginModal(!showLoginModal)}
            />
            <NavLink
              text="Sign Up"
              bg={useColorModeValue("#1384D7", "#C8CBCD")}
              color={useColorModeValue("white", "#222223")}
              onClick={() => setShowRegisterModal(!showRegisterModal)}
            />
          </>
        )}
        <Dropdown title={user && user.username} icon={<FaUserCircle />}>
          <Box
            w="12%"
            h="max-content"
            position="absolute"
            right="40px"
            top="45px"
            borderWidth="1px"
            borderColor="gray.200"
            bg={bg}
          >
            {user && (
              <>
                <DropdownTitle label={"My Stuff"} />
                <DropdownLink
                  title="Profile"
                  icon={<FaUserCircle color={color} />}
                  href={`/user/${user.username}`}
                />
                <DropdownItem
                  title="User Settings"
                  icon={<GoGear color={color} />}
                  onClick={() => {
                    console.log("");
                  }}
                />
              </>
            )}
            <DropdownTitle label={"View Options"} />
            <CustomDropdownItem
              title="Dark Mode"
              icon={<FaMoon color={color} />}
            >
              <Switch
                onChange={toggleColorMode}
                isChecked={colorMode === "dark" ? true : false}
              />
            </CustomDropdownItem>
            <DropdownTitle label="More Options" />
            {!user ? (
              <DropdownItem
                title="Log In / Sign Up"
                icon={<RiLoginBoxFill color={color} />}
                onClick={() => {
                  setShowLoginModal(!showLoginModal);
                }}
              />
            ) : (
              <DropdownItem
                title="Log Out"
                icon={<RiLoginBoxFill color={color} />}
                onClick={() => {
                  logOut();
                  window.location.reload();
                }}
              />
            )}
          </Box>
        </Dropdown>
      </HStack>
      <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
      <RegisterModal
        showModal={showRegisterModal}
        setShowModal={setShowRegisterModal}
      />
    </Flex>
  );
}

const NavLink: React.FC<NavLinkProps> = ({
  text,
  bg,
  color,
  onClick,
  ...otherProps
}) => {
  return (
    <Button
      px="34px"
      py="5px"
      borderRadius="25px"
      color={color}
      bg={bg}
      fontWeight="bold"
      fontFamily="Noto Sans"
      _hover={{
        textDecor: "none",
      }}
      onClick={onClick}
      {...otherProps}
    >
      {text}
    </Button>
  );
};

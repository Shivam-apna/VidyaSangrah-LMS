import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import Navbar from "../Navbar/Navbar";
function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [state, setState] = useState("");
  let [isLoading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let navigate = useNavigate();
  let toast = useToast();
  let user = localStorage.getItem("user");
  let handleForm = () => {
    let payload = { name, email, password, state };
    if (name && email && password && state) {
      setLoading(true);
      axios
        .post(`http://localhost:3000/${user}/signup`, payload)
        .then((res) => {
          console.log(res.data.msg);
          if (res.data.msg === "your blocked!") {
            toast({
              description: res.data.msg,
              status: "error",
              isClosable: true,
              duration: 9000,
              position: "top",
            });
          } else {
            toast({
              description: res.data.msg,
              status: "success",
              isClosable: true,
              duration: 9000,
              position: "top",
            });
            setLoading(false);
            navigate("/login");
          }
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      toast({
        description: "all fields required",
        status: "error",
        isClosable: true,
        duration: 9000,
        position: "top",
      });
    }
  };
  let arr = [
    "Select State",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];
  return (
    <Box
      bgColor={"#fff"}
      p={2}
      h={"100vh"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box>
        <Link to={"/"}>
          <Image
            className={styles["logo-image"]}
            src="../../vidya-sangrah.png"
          />
        </Link>
      </Box>

      <Box
        bgColor={"#a435f0"}
        color={"white"}
        shadow={"lg"}
        w="fit-content"
        p={"3%"}
        borderRadius={10}
        display={"flex"}
        flexDir="column"
        alignItems="center"
        justifyContent={"center"}
        gap={5}
      >
        <Text fontWeight={600} fontSize={25}>
          Sign Up{" "}
        </Text>
        <InputGroup size="md">
          <Input
            bgColor={"white"}
            color={"black"}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md">
          <Input
            bgColor={"white"}
            color={"black"}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md">
          <Select
            onChange={(e) => setState(e.target.value)}
            color={"black"}
            bgColor={"white"}
          >
            {arr.map((el, index) => (
              <option key={index}>{el}</option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            bgColor={"white"}
            color={"black"}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              <ViewIcon color={"black"} />
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          className={styles["submit"]}
          onClick={handleForm}
          color={"white"}
          bgColor={"green"}
          isLoading={isLoading ? true : false}
          loadingText="Submitting"
        >
          submit
        </Button>
        <Text
          className={styles["capture-atention"]}
          fontWeight={600}
          fontSize={20}
        >
          Already have an account?
        </Text>
        <Text color={"blue"} fontWeight={600} fontSize={20}>
          <Link className={styles["log-in"]} to={"/login"}>
            Log In
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Signup;

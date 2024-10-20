import { CheckCircleIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationSlider from "../ApplicationSlider";
import Navbar from "../Navbar/Navbar";

function Student() {
  let [student, setStudent] = useState([]);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [studentId, setStudentId] = useState("");
  let [state, setState] = useState("");
  let [course, setCourse] = useState("");
  let [coursetime, setCoursetime] = useState("");
  let [index, setIndex] = useState("");
  let [student_userId, setStudent_userId] = useState("");

  let [img, setImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXCTlMvfcUMsJ4r4seTYMY8_k8V31eV3LKUxkdR34n0BurNYuarum86BROpRlbhoQlxU&usqp=CAU"
  );
  let [idle, setIdel] = useState(0);
  let [application, setApplication] = useState([]);
  let navigate = useNavigate();

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let user = localStorage.getItem("user");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  let isToken = localStorage.getItem("token");

  let toast = useToast();
  let getStudentList = () => {
    fetch("http://localhost:3000/adminwork/getStudentsList", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        setStudent(res.msg);
      })
      .catch((e) => console.log(e));
  };
  let handleBlock = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/adminwork/blockStudent/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        setIdel(idle + 1);
        toast({
          description: res.msg,
          status: "success",
          isClosable: true,
          duration: 9000,
          position: "top",
        });
      })
      .catch((e) => console.log(e));
  };
  let handleDelete = (id) => {
    fetch(`http://localhost:3000/adminwork/DeleteStudent/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setIdel(idle + 1);
        toast({
          description: res.msg,
          status: "success",
          isClosable: true,
          duration: 9000,
          position: "top",
        });
      })
      .catch((e) => console.log(e));
  };
  let handleNewStudent = () => {
    if (name && email && img && studentId) {
      let payload = {
        name: name,
        student_id: studentId,
        image: img,
        email: email,
        state: state,
        course: course,
        coursetime: coursetime,
        student_userId: student_userId,
        index: index,
      };
      fetch("http://localhost:3000/adminwork/createStudent", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setIdel(idle + 1);
          toast({
            description: res.msg,
            status: "success",
            isClosable: true,
            duration: 9000,
            position: "top",
          });
          student.length++;
          onClose();
        })
        .catch((er) => console.log(er));
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
  let handleEdit = (el) => {
    navigate("/edit", { state: el });
  };

  let getApplicationList = () => {
    fetch("http://localhost:3000/application/getapplicationlist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        setApplication(res.msg);
      })
      .catch((e) => console.log(e));
  };
  let removeFromApplicationList = (id) => {
    fetch(`http://localhost:3000/application//removeapplicant/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
      })
      .catch((e) => console.log(e));
  };
  let OpenModal = (el) => {
    onOpen();
    setName(el.name);
    setEmail(el.email);
    setState(el.state);
    setCourse(el.course);
    setCoursetime(el.coursetime);
    setIndex(Number(el.index));
    setStudent_userId(el.userId);
    removeFromApplicationList(el._id);
  };

  useEffect(() => {
    if (!isToken || currentUser.person === "student") {
      navigate("/");
    }
    getStudentList();
    getApplicationList();
  }, [idle]);

  return (
    <Box>
      <Navbar />
      <Box m="auto" p={5}>
        <ApplicationSlider
          application={application}
          getApplicationList={getApplicationList}
          OpenModal={OpenModal}
        />
        <Grid
          templateColumns={{
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
          p={2}
          alignItems={"center"}
        >
          {student.length > 0 &&
            student.map((el, index) => (
              <Box
                border={"1px solid gray"}
                key={index}
                boxShadow={"md"}
                borderRadius={10}
                bgColor={"#66b9bf"}
              >
                <Box h={"50%"} m="auto" w={"100%"}>
                  <Image
                    borderTopRightRadius={10}
                    borderTopRadius={10}
                    h={"100%"}
                    w={"100%"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXCTlMvfcUMsJ4r4seTYMY8_k8V31eV3LKUxkdR34n0BurNYuarum86BROpRlbhoQlxU&usqp=CAU"
                  />
                </Box>
                <Box
                  display={"flex"}
                  flexDir="column"
                  justifyContent={"space-between"}
                  color={"whiteAlpha.900"}
                  fontWeight={500}
                >
                  <Text>{`name: ${el.name}`}</Text>
                  <Text>{`Student-ID: ${el.student_id}`}</Text>
                  <Text>{`Email-ID: ${el.email}`}</Text>
                  <Text>{`State: ${el.state}`}</Text>
                  <Text>
                    {`Course: ${el.course}`} <Badge>{el.coursetime}</Badge>
                  </Text>
                </Box>
                <Grid
                  templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(3, 1fr)",
                  }}
                  gap={4}
                  p={4}
                  alignItems={"center"}
                >
                  <Button
                    bg={"red"}
                    color={"white"}
                    fontSize={15}
                    p={2}
                    onClick={() => handleDelete(el._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    bg={"green"}
                    color={"white"}
                    fontSize={15}
                    onClick={() => handleEdit(el)}
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                </Grid>
              </Box>
            ))}
        </Grid>
      </Box>

      {/* modal to add student */}
      <>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Student</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={initialRef}
                  placeholder="Student Name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={initialRef}
                  placeholder="Student Email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Student-ID</FormLabel>
                <Input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  ref={initialRef}
                  placeholder="Eg: fw18_1184"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Course</FormLabel>
                <Input
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  ref={initialRef}
                  placeholder=" Student Course"
                />
              </FormControl>
              <FormControl>
                <FormLabel>CourseType</FormLabel>
                <Input
                  value={coursetime}
                  onChange={(e) => setCoursetime(e.target.value)}
                  ref={initialRef}
                  placeholder=" Student Course Time"
                />
              </FormControl>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  ref={initialRef}
                  placeholder=" Student State "
                />
              </FormControl>
              <FormControl>
                <FormLabel>Index</FormLabel>
                <Input
                  value={index}
                  onChange={(e) => setIndex(e.target.value)}
                  ref={initialRef}
                  placeholder=" Student Index "
                />
              </FormControl>
              <FormControl>
                <FormLabel>Student_userId</FormLabel>
                <Input
                  value={student_userId}
                  onChange={(e) => setStudent_userId(e.target.value)}
                  ref={initialRef}
                  placeholder=" Student UserId "
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  ref={initialRef}
                  placeholder=" Student Image Url"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleNewStudent()}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
}

export default Student;

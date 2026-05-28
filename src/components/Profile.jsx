import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaUserCircle, FaGlobe } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { getUserProfile,updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    photoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, photoUrl } = formData;
    if (!fullName.trim() || !photoUrl.trim()) {
      alert("All fields are required");
      return;
    }
    try {
      await updateProfile(fullName, photoUrl);

      alert("Profile Updated");
      setFormData({
        fullName: "",
        photoUrl: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser=async()=>{
    const res =await getUserProfile();
     if(res?.success){
      console.log("user data ",res?.data);
        console.log(res.data.users[0].displayName);
  console.log(res.data.users[0].photoUrl);
  setFormData((prev)=>({
    ...prev,
    fullName: res.data.users[0].displayName,
        photoUrl: res.data.users[0].photoUrl,
  }))
     }
  }
  useEffect(()=>{
  fetchUser()
  },[])
  return (
    <Container fluid className="mt-3">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
        <p className="fst-italic mb-0">
          Success is the sum of small efforts repeated daily.
        </p>

        <div className="bg-light px-3 py-2 rounded shadow-sm">
          <small>
            Your profile is incomplete.{" "}
            <span className="text-primary fw-semibold">Complete now</span>
          </small>
        </div>
      </div>

      <div className=" rounded p-4 shadow-sm bg-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Contact Details</h4>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              setFormData({
                fullName: "",
                photoUrl: "",
              });
            }}
          >
            Cancel
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                  <FaUserCircle />
                  Full Name
                </Form.Label>

                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold d-flex align-items-center gap-2">
                  <FaGlobe />
                  Profile Photo URL
                </Form.Label>

                <Form.Control
                  type="text"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-4">
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;

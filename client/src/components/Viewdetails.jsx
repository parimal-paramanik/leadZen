import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from "@mui/material";

const ParentDiv = styled(Box)`
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 40px;
  padding: 23px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

const Updiv = styled(Box)``;
const Downdiv = styled(Box)`
  display: flex;
  gap: 20%;
  margin: auto;
  margin-top: 3%;
`;

const Leftdiv = styled(Box)``;
const Rightdiv = styled(Box)``;

const Viewdetails = ({ id }) => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const response = await request.json();
        if (response) {
          setUsers(response);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <ParentDiv>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Updiv>
            <Typography variant='h6'>Description</Typography>
            <Typography variant='h7'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto a quam nisi non. Quis quo laboriosam
              quaerat aut ullam nobis eaque obcaecati, totam provident mollitia quae distinctio et itaque illum
            </Typography>
          </Updiv>
          <Downdiv>
            <Leftdiv>
              <Typography variant='h7'>Username</Typography>
              <Typography >{users.username}</Typography>
              <Typography variant='h7'>Email</Typography>
              <Typography>{users.email}</Typography>
              <Typography variant='h7'>Website</Typography>
              <Typography>{users.website}</Typography>
            </Leftdiv>
            <Rightdiv>
              <Typography variant='h7'>Street</Typography>
              <Typography>{users.address.street}</Typography>
              <Typography variant='h7'>Suite</Typography>
              <Typography>{users.address.suite}</Typography>
              <Typography variant='h7'>City</Typography>
              <Typography>{users.address.city}</Typography>
            </Rightdiv>
          </Downdiv>
        </>
      )}
    </ParentDiv>
  );
};

export default Viewdetails;

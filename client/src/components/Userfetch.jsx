import React, { useEffect, useState } from 'react';
import { Box, styled, Button } from "@mui/material";
import Viewdetails from './Viewdetails';

const Maindiv = styled(Box)`
  border: 2px solid black;
  width: 80%;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 5rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

const Buttons = styled(Button)`
  background: #fa2d41;
  color: white;
  border-radius: 8px;
  transition: background-color 0.3s;
  font-size:12px;
  font-weight:bold;
  
  &:hover {
    background: #f7142b;
    font-size:13px;
  }

  @media (max-width: 780px) {
    margin-top: 2rem;
  }
`;

const Parentdiv = styled(Box)`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  margin-top: 40px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media (max-width: 780px) {
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: left;
  }
`;

const ContactBox = styled(Box)`
@media (max-width: 780px){
  width: 12rem;
  margin-bottom: 1.5rem;
}
`;

const NameBox = styled("p")({
  '@media (max-width: 780px)': {
    width: "12rem",
  },
});

const Userfetch = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showdetails, setShowdetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers,SetAllUsers] = useState([]);


  useEffect(()=>{
    async function allUsers (){
      try {
        const request = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const response = await request.json();
        if (response) {
          console.log(response)
          SetAllUsers(response);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    allUsers()
  },[])

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await fetch(`http://localhost:8080/address/users?page=${currentPage}`);
        const response = await request.json();
        if (response) {
          setUsers(response.users);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    const filteredUsers = allUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredUsers.length > 0) {
      setSearchResults(filteredUsers);
    } else {
      setSearchResults([]);
      alert("no user with that name found")
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setShowdetails(!showdetails);
  };

  return (
    <Maindiv>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"2rem",gap:"1rem"}}>
      <input
  type="text"
  placeholder="Search by name"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    width: "15rem",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    outline: "none",
    
  }}
/>

     <Button
  style={{
    backgroundColor: "#fa5061",
    color: "white",
    transition: "background-color 0.3s, font-size 0.3s",
    ':hover': {
      backgroundColor: "#f7142b",
      fontSize: "18px",
    },
  }}
  onClick={handleSearch}
  disabled = {searchQuery === ""}
>
  Search
</Button>
      </div>

      {searchResults.length > 0 ? (
        searchResults.map((data, id) => (
          <Box key={id}>
            <Parentdiv>
              <NameBox style={{ textAlign: "center" }} variant='h6'>
                {data.name}
              </NameBox>
              <Box variant='h6' style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
                <Box>Contact</Box> <ContactBox style={{ textAlign: "center" }}>{data.email}</ContactBox>
              </Box>
              <Box variant='h6' style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
                <Box>City</Box> <Box>{data.address.city}</Box>
              </Box>
              <Buttons onClick={() => handleUserClick(data.id)}>View Details</Buttons>
            </Parentdiv>
            <Box>
              {selectedUserId === data.id && showdetails && <Viewdetails id={data.id} />}
            </Box>
          </Box>
        ))
      ) : (
        users?.length > 0 ? (
          users?.map((data, id) => (
            <Box key={id}>
              <Parentdiv>
                <NameBox style={{ textAlign: "center" }} variant='h6'>
                  {data.name}
                </NameBox>
                <Box variant='h6' style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
                  <Box>Contact</Box> <ContactBox style={{ textAlign: "center" }}>{data.email}</ContactBox>
                </Box>
                <Box variant='h6' style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20%" }}>
                  <Box>City</Box> <Box>{data.address.city}</Box>
                </Box>
                <Buttons onClick={() => handleUserClick(data.id)}>View Details</Buttons>
              </Parentdiv>
              <Box>
                {selectedUserId === data.id && showdetails && <Viewdetails id={data.id} />}
              </Box>
            </Box>
          ))
        ) : (
          <div>Loading...</div>
        )
      )}

      <Box style={{ display: "flex", width: "15rem", alignItems: "center", justifyContent: 'space-between', margin: "auto", marginTop: "80px", marginBottom: "50px" }}>
        <Buttons onClick={handlePrevClick}>prev</Buttons>
        <Buttons onClick={handleNextClick}>next</Buttons>
      </Box>
    </Maindiv>
  );
};

export default Userfetch;

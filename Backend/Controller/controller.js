const axios = require("axios");
const express = require("express");

const getAllAddress = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 3;
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const allUsers = usersResponse.data;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const usersOnPage = allUsers.slice(startIndex, endIndex);
    const response = {
      users: usersOnPage,
      currentPage: page,
      usersPerPage: perPage,
      totalPages: Math.ceil(allUsers.length / perPage),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};


module.exports = { getAllAddress };

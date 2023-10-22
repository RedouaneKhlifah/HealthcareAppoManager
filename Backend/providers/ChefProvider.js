import asynchandler from "express-async-handler";
import { UserSchema, ChefSchema, validator } from "../validators/JoiSchemas.js";
import { ChefModel } from "../models/ChefModel.js";
import { UserModel } from "../models/UserModel.js";



/**
 * @desc Get all Chefs
 * @route GET /Chefs
 * @access private
 */
const getAllChefs = asynchandler(async (req, res) => {
    const Chefs = await UserModel.findAll({ include: ChefModel });
    res.status(200).json(Chefs);
});



/**
 * @desc Get a Chef by ID
 * @route GET /Chefs/:id
 * @access private
 */
const getOneChefById = asynchandler(async (req, res) => {
    const Chef = await UserModel.findByPk(req.params.id, {
        include: ChefModel
    });
    if (!Chef) {
        return res.status(404).json({ message: "Chef not found" });
    }
    res.status(200).json(Chef);
});



/**
 * @desc Create a new Chef
 * @route POST /chef/create
 * @access private
 */
const createChef = asynchandler(async (req, res) => {
    const { first_name, last_name, email, profile_image, password, grade ,succursal_id  } = req.body;

    const user = {
        first_name,
        last_name,
        email,
        password,
        profile_image
    };

    const chef = {
        grade,
        succursal_id
    };

    // validator(UserSchema, user);
    // validator(ChefSchema, chef);

    const Chef = await ChefModel.create(
        {
            grade,
            user: {
                first_name: first_name.customTrim(),
                last_name: last_name.customTrim(),
                email: email,
                password: password,
                profile_image: profile_image
            },
        },
        {
            include: [ChefModel.user]
        }
    );

    return res.status(201).json(Chef);
});



/**
 * @desc Update a Chef by ID
 * @route PATCH /chef/update/:id
 * @access private
 */

const updateChef = asynchandler(async (req, res) => {
    validator(ChefSchema, req.body);

    const { id } = req.params;
    const { grade, email, profile_image, password,succursal_id } = req.body;

    try {
        // Find the Chef by id
        const chef = await ChefModel.findByPk(id);

        // If the Chef doesn't exist, return a 404 Not Found response
        if (!chef) {
            return res.status(404).json({ error: "Chef not found" });
        }

        // Check if a user with the same email exists
        const existingUser = await UserModel.findOne({ where: { email } });

        // If an existing user is found and is not the same as the chef, return a 400 Bad Request response
        if (existingUser && existingUser.id !== chef.userId) {
            return res.status(400).json({ error: "Email is already in use" });
        }

        // Update the Chef's information with the data from the request body
        chef.grade = grade;
        chef.succursal_id = succursal_id;
        chef.save();

        // Update the associated User's information (assuming User has an 'email' field)
        const user = await UserModel.findByPk(chef.userId);
        user.email = email;
        user.profile_image = profile_image;

        // If a new password is provided, hash and update the password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        return res.status(200).json(chef);
    } catch (error) {
        return res.status(400).json({ error: "Failed to update Chef" });

    }
});



/**
 * @desc Delete a Chef by ID
 * @route DELETE /Chef/:id
 * @access private
 */
const deleteChef = async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Chef not found" });
      }

      const Chef = await ChefModel.findByPk(user.actor_id);
      const [ChefDestroyResult, userDestroyResult] = await Promise.all([
        Chef.destroy().catch((error) => {
          throw error;
        }),
        user.destroy().catch((error) => {
          throw error;
        })
      ]);

      if (ChefDestroyResult === null || userDestroyResult === null) {
        return res.status(500).json({ message: "Failed to delete Chef or user" });
      }

      return res.status(204).send();
    } catch (error) {
      // Handle the error here
      console.error("Error in deleteChef:", error);

      // Send an appropriate error response to the client
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export { createChef, getAllChefs, getOneChefById, updateChef, deleteChef };

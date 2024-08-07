// const Author = require('../model/author.model.js');
// const generateToken = require('../token/generateToken.js');

// const registerAuthor = async(req,res)=>{
//     const {name,dob,city,state,country,gender,status,mobile,email} = req.body
//     const file = req.file;
//     try {
//         const newAuthor = new Author({
//             name,
//             dob,
//             city,
//             state,
//             country,
//             gender,
//             photo:file.filename,
//             status,
//             mobile,
//             email
//         })
//         const tokenData = await generateToken({ _id: Author._id });

        
//         await newAuthor.save();
//         return res.status(201).json({
//             newAuthor,
//             token:tokenData.token
//         });
//     } catch (error) {
//         return res.status(400).send({error:error.message})
//     }
// }

// const profileDisplay = async (req, res) => {
//     const { id } = req.params;
//     const baseURL = 'https://bookingreadingapp.onrender.com/uploads'; 

//     try {
//         const author = await Author.findById(id);

//         if (!author) {
//             return res.status(404).send({ error: 'Author not found' });
//         }

//         let authorWithPhotoURL = {
//             ...author._doc,
//             photoURL: author.photo ? `${baseURL}/${author.photo}` : null
//         };

//         return res.status(200).send(authorWithPhotoURL);
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };


// const loginAuthor = async(req,res)=>{
//     const {mobile,name} = req.body;
//     if(!mobile || !name)
//     {
//         res.status(400).json({message:"please provide name and mobile number"})
//     }
//     try {
//         const author = await Author.findOne({mobile,name})
//         if(!author)
//         {
//             return res.status(400).json({message:"invalid credetials"})
//         }
//         const tokenData = await generateToken({ _id: Author._id });


//         res.status(200).json({message:"login successfully",author,token:tokenData.token})
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
    
// }

// const allAuthor = async (req, res) => {
//     const baseURL = 'https://bookingreadingapp.onrender.com/uploads';

//     try {
//         const authors = await Author.find();
//         if (!authors || authors.length === 0) {
//             return res.status(400).send({ message: "No authors found" });
//         }

//         const authorsWithPhotoURL = authors.map(author => ({
//             ...author._doc,
//             photo: author.photo ? `${baseURL}/${author.photo}` : null
//         }));

//         return res.status(200).send(authorsWithPhotoURL);
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };


// // const editAuthor = async (req, res) => {
// //     const { id } = req.params;
// //     const updateFields = req.body; 
// //     console.log(req.body);
// //     const file = req.file; 

// //     try {
// //         let author = await Author.findById(id);
// //         if (!author) {
// //             return res.status(404).send({ message: "Author not found with this ID" });
// //         }
// //         if (updateFields.name) {
// //             author.name = updateFields.name;
// //         }
// //         if (updateFields.dob) {
// //             author.dob = updateFields.dob;
// //         }
// //         if (updateFields.city) {
// //             author.city = updateFields.city;
// //         }
// //         if (updateFields.state) {
// //             author.state = updateFields.state;
// //         }
// //         if (updateFields.country) {
// //             author.country = updateFields.country;
// //         }
// //         if (updateFields.gender) {
// //             author.gender = updateFields.gender;
// //         }
// //         if (updateFields.status) {
// //             author.status = updateFields.status;
// //         }
// //         if (updateFields.mobile) {
// //             author.mobile = updateFields.mobile;
// //         }
// //         if (updateFields.email) {
// //             author.email = updateFields.email;
// //         }

// //         if (file) {
// //             author.photo = file.filename;
// //         }
        
// //         await author.save();

// //         res.status(200).json({ message: "Author updated successfully", author });
// //     } catch (error) {
// //         res.status(400).send({ error: error.message });
// //     }
// // }
// const editAuthor = async (req, res) => {
//     const { id } = req.params;
//     const updateFields = { ...req.body }; 
//     const file = req.file; 
//     const baseURL = 'https://bookingreadingapp.onrender.com/uploads'; 

//     try {
//         let author = await Author.findById(id);
//         if (!author) {
//             return res.status(404).send({ message: "Author not found with this ID" });
//         }
//         if (file) {
//             updateFields.photo = file.filename;
//         }

//         author = await Author.findByIdAndUpdate(id, updateFields, { new: true });
//         if (author.photo) {
//             author.photo = `${baseURL}/${author.photo}`;
//         }

//         res.status(200).json({ message: "Author updated successfully", author });
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// };

// const deleteAuthor = async(req,res)=>{
//     const {id} = req.params;
//     try {
//         const author = await Author.findByIdAndDelete(id);
//         res.status(200).send(author);
//     } catch (error) {
//         res.status(400).send({error:error.message})
//     }
// }


// module.exports = {
//     registerAuthor,
//     profileDisplay,
//     loginAuthor,
//     allAuthor,
//     editAuthor,
//     deleteAuthor
// }












// const Author = require('../model/author.model.js');
// const generateToken = require('../token/generateToken.js');
// const sendGridMail = require('@sendgrid/mail');
// const bcrypt = require('bcryptjs');

// sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

// const generatePassword = () => {
//     return Math.random().toString(36).slice(-8);
// };

// const sendWelcomeEmail = async (email, name, password) => {
//     const msg = {
//         to: email,
//         from: '57rakesh17@gmail.com',
//         subject: 'Welcome to Our Platform',
//         text: `Hello ${name},\n\nYour account has been created. Your password is: ${password}\n\nPlease keep it secure.`,
//         html: `<p>Hello ${name},</p><p>Your account has been created. Your password is: <strong>${password}</strong></p><p>Please keep it secure.</p>`,
//     };

//     try {
//         await sendGridMail.send(msg);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// };

// const registerAuthor = async (req, res) => {
//     const { name, dob, city, state, country, gender, status, mobile, email } = req.body;
//     const file = req.file;
//     const password = generatePassword();

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newAuthor = new Author({
//             name,
//             dob,
//             city,
//             state,
//             country,
//             gender,
//             photo: file ? file.filename : null,
//             status,
//             mobile,
//             email,
//             password
//         });

//         await newAuthor.save();
//         await sendWelcomeEmail(email, name, password);

//         const tokenData = await generateToken({ _id: newAuthor._id });

//         return res.status(201).json({
//             newAuthor,
//             token: tokenData.token
//         });
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };

// const profileDisplay = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const author = await Author.findById(id);
//         return res.status(200).send(author);
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// };

// const loginAuthor = async (req, res) => {
//     const { email, password } = req.body;
//       console.log("Password from request body:", password); 

//     if (!email || !password) {
//         return res.status(400).json({ message: "Please provide email and password" });
//     }

//     try {
//         const author = await Author.findOne({ email });
//         console.log("Author from database:", author); 

//         if (!author) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         const authorPassword = author.password
//         console.log(authorPassword)
   
//         if (password !== authorPassword) {
   
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // const isMatch = await bcrypt.compare(password, author.password);
//         // console.log("Password comparison result:", isMatch); // Log the comparison result

//         // if (!isMatch) {
//         //     return res.status(400).json({ message: "Invalid credentials" });
//         // }

//         const tokenData = await generateToken({ _id: author._id });

//         return res.status(200).json({ message: "Login successful", author, token: tokenData.token });
//     } catch (error) {
//         console.error("Error during login:", error); // Log the error
//         return res.status(400).json({ error: error.message });
//     }
// };

// const allAuthor = async (req, res) => {
//     try {
//         const authors = await Author.find();
//         if (!authors.length) {
//             return res.status(400).send({ message: "No authors found" });
//         }
//         return res.status(200).send(authors);
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };

// const editAuthor = async (req, res) => {
//     const { id } = req.params;
//     const updateFields = req.body;
//     const file = req.file;

//     try {
//         let author = await Author.findById(id);
//         if (!author) {
//             return res.status(404).send({ message: "Author not found with this ID" });
//         }

//         for (let key in updateFields) {
//             if (updateFields.hasOwnProperty(key)) {
//                 author[key] = updateFields[key];
//             }
//         }

//         if (file) {
//             author.photo = file.filename;
//         }

//         await author.save();

//         return res.status(200).json({ message: "Author updated successfully", author });
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };

// const deleteAuthor = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const author = await Author.findByIdAndDelete(id);
//         return res.status(200).send(author);
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };

// module.exports = {
//     registerAuthor,
//     profileDisplay,
//     loginAuthor,
//     allAuthor,
//     editAuthor,
//     deleteAuthor
// };













const Author = require('../model/author.model.js');
const generateToken = require('../token/generateToken.js');
const sendGridMail = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
require('dotenv').config();

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
};

const sendWelcomeEmail = async (email, name, password) => {
    const msg = {
        to: email,
        from: '57rakesh17@gmail.com',
        subject: 'Welcome to Our Platform',
        text: `Hello ${name},\n\nYour account has been created. Your password is: ${password}\n\nPlease keep it secure.`,
        html: `<p>Hello ${name},</p><p>Your account has been created. Your password is: <strong>${password}</strong></p><p>Please keep it secure.</p>`,
    };

    try {
        await sendGridMail.send(msg);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const registerAuthor = async (req, res) => {
    const { name, dob, city, state, country, gender, status, mobile, email } = req.body;
    const file = req.file;
    const password = generatePassword();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuthor = new Author({
            name,
            dob,
            city,
            state,
            country,
            gender,
            photo: file ? file.filename : null,
            status,
            mobile,
            email,
            password
        });

        await newAuthor.save();
        await sendWelcomeEmail(email, name, password);

        const tokenData = await generateToken({ _id: newAuthor._id });

        return res.status(201).json({
            newAuthor,
            token: tokenData.token
        });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

const profileDisplay = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        return res.status(200).send(author);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const loginAuthor = async (req, res) => {
    const { email, password } = req.body;
      console.log("Password from request body:", password); 

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const author = await Author.findOne({ email });
        console.log("Author from database:", author); 

        if (!author) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const authorPassword = author.password
        console.log(authorPassword)
   
        if (password !== authorPassword) {
   
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // const isMatch = await bcrypt.compare(password, author.password);
        // console.log("Password comparison result:", isMatch); // Log the comparison result

        // if (!isMatch) {
        //     return res.status(400).json({ message: "Invalid credentials" });
        // }

        const tokenData = await generateToken({ _id: author._id });

        return res.status(200).json({ message: "Login successful", author, token: tokenData.token });
    } catch (error) {
        console.error("Error during login:", error); // Log the error
        return res.status(400).json({ error: error.message });
    }
};

const allAuthor = async (req, res) => {
    try {
        const authors = await Author.find();
        if (!authors.length) {
            return res.status(400).send({ message: "No authors found" });
        }
        return res.status(200).send(authors);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

const { Types: { ObjectId } } = require('mongoose'); // Import ObjectId correctly

// const editAuthor = async (req, res) => {
//     const { id } = req.params;
//     const updateFields = req.body;
//     const file = req.file;

//     try {
//         console.log("Editing author with ID:", id); // Log the ID to check if it's correct

//         // Convert id to ObjectId
//         const authorId = ObjectId(id);

//         let author = await Author.findById(authorId);
//         console.log("Author fetched from database:", author); // Log the author object

//         if (!author) {
//             return res.status(404).send({ message: "Author not found with this ID" });
//         }

//         // Check if updateFields is an object
//         if (typeof updateFields !== 'object' || updateFields === null) {
//             return res.status(400).send({ message: "Invalid update fields provided" });
//         }

//         // Update author fields
//         for (let key in updateFields) {
//             if (Object.prototype.hasOwnProperty.call(updateFields, key)) {
//                 author[key] = updateFields[key];
//             }
//         }

//         // Update photo if file is uploaded
//         if (file) {
//             author.photo = file.filename;
//         }

//         await author.save();

//         return res.status(200).json({ message: "Author updated successfully", author });
//     } catch (error) {
//         console.error("Error editing author:", error); // Log any errors
//         return res.status(400).send({ error: error.message });
//     }
// };

const editAuthor = async (req,res)=>{
    try {
        const {id} = req.params;
        const author = await Author.findById(id);
        if(!author) return res.status(404).send({message:"Author not found with this"});
        const { name, dob, city, state, country, gender, status, mobile, email } = req.body;
        const file = req.file;
        const updateData = {
            name,
            dob,
            city,
            state,
            country,
            gender,
            status,
            mobile,
            email,
            photo: file ? file.filename : null
        }

        const updatedData = await Author.findByIdAndUpdate(id,updateData,{new:true})
        return res.status(200).json({
            message:"author updated successfully",
            author:updatedData
        })
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


// const editAuthor = async (req, res) => {
//     const { id } = req.params;
//     const updateFields = req.body;
//     const file = req.file;

//     try {
//         let author = await Author.findById(id);
//         if (!author) {
//             return res.status(404).send({ message: "Author not found with this ID" });
//         }

//         // Check if updateFields is an object
//         if (typeof updateFields !== 'object' || updateFields === null) {
//             return res.status(400).send({ message: "Invalid update fields provided" });
//         }

//         // Update author fields
//         for (let key in updateFields) {
//             if (Object.prototype.hasOwnProperty.call(updateFields, key)) {
//                 author[key] = updateFields[key];
//             }
//         }

//         // Update photo if file is uploaded
//         if (file) {
//             author.photo = file.filename;
//         }

//         await author.save();

//         return res.status(200).json({ message: "Author updated successfully", author });
//     } catch (error) {
//         return res.status(400).send({ error: error.message });
//     }
// };


const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByIdAndDelete(id);
        return res.status(200).send(author);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
};

module.exports = {
    registerAuthor,
    profileDisplay,
    loginAuthor,
    allAuthor,
    editAuthor,
    deleteAuthor
};

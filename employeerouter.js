const express=require('express');
const Employee=require('../models/employee');
const router=express.Router();

router.get("/", (request, response)=>{
    try {
        const employees = Employee.find({});
        response.status(200).json(employees);
    }catch (error){
        response.status(500).json({message: error.message});
    }
});

router.get("/:id", async (request, response)=> {
    try {
        const employee = await Employee.findById(request.params.id);
        response.status(200).json(employee);
    }
    catch (error){
        response.status(500).json({message: error.message});
    }
});

router.post("/", async (request, response)=> {
    try {
        const {name, email, department, role, salary} = request.body;
        if (!name){
            return response.status(400).json({message: "Name is required"});
        }
        else if (!email){
            return response.status(400).json({message: "Email is required"});
        }
        else if (!department){
            return response.status(400).json({message: "Department is required"});
        }
        else if (!role){
            return response.status(400).json({message: "Role is required"});
        }
        else if (!salary){
            return response.status(400).json({message: "Salary is required"});
        }
        
        const newEmployee ={
            name: request.body.name,
            email: request.body.email,
            department: request.body.department,
            role: request.body.role,
            salary: request.body.salary
        };
        const employee = new Employee(newEmployee);
        await employee.save();
        response.status(201).json({message: "Employee created successfully", employee});
    }
    catch (error){
        response.status(500).json({message: error.message});
    }
});
router.put("/:id",async (request,response)=>{
    try {
        const employee=await Employee.findByIdAndUpdate(request.params.id,request.body,{new:true});
        response.status(200).json({message:"Employee updated successfully",employee});
    } catch (error) {
        response.status(500).json({message:error.message});
    }
});

router.delete("/:id",async (request,response)=>{
    try {
        const employee=await Employee.findByIdAndDelete(request.params.id);
        response.status(200).json({message:"Employee deleted successfully",employee});
    } catch (error) {
        response.status(500).json({message:error.message});
    }
});

module.exports=router;
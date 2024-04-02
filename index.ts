import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import express from "express";
import cors from "cors"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

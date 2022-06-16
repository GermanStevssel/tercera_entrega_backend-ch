import { Router } from "express";
import graphqlInstance from "../graphql/graphql";

const graphqlRouter = Router();

graphqlRouter("/", graphqlInstance.graphql);

export default graphqlRouter;

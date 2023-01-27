import Home from "./components/screens/Home";
import ExamCohort from "./components/screens/ExamCohort";
import Assessment from "./components/screens/Assessment";
import CreateAssessment from "./components/screens/CreateAssessment";
import Popup from "./components/Popup";
import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import PublicRoute from "./components/PublicRoute";
import MCQForm from "./components/MCQForm";
import TestForm from "./components/TestForm";
import CreateMV from "./components/CreateMV";
import CreateMCQ from "./components/screens/CreateMCQ";
import ExamScreen from "./components/screens/ExamScreen";
import PublishAssessment from "./components/screens/PublishAssessment";
import AssessmentScreen from "./components/screens/AssessmentScreen";
import EditMarks from "./components/screens/EditMarks";
import CreateGroup from "./components/CreateGroup";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthRoute>
              <ExamCohort />
            </AuthRoute>
          }
        />

        <Route
          path="dashboard/:id"
          element={
            <AuthRoute>
              <Assessment isEvaluator={true} />
            </AuthRoute>
          }
        />
        <Route
          path="dashboard/view/:id"
          element={
            <AuthRoute>
              <Assessment isEvaluator={false} />
            </AuthRoute>
          }
        />
        <Route
          path="dashboard/view/:id/:assessmentId"
          element={
            <AuthRoute>
              <ExamScreen isEvaluator={false} />
            </AuthRoute>
          }
        />
        <Route
          path="dashboard/:id/create"
          element={
            <AuthRoute>
              <CreateAssessment />
            </AuthRoute>
          }
        />
        <Route
          path="dashboard/:id/:assessmentId"
          element={
            <AuthRoute>
              <AssessmentScreen />
            </AuthRoute>
          }
        />
        <Route
          path="dashboard/:id/:assessmentId/:candidateId"
          element={
            <AuthRoute>
              <EditMarks />
            </AuthRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    
  );
}

export default App;

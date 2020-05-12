import React from "react";
import { render, cleanup } from "@testing-library/react";
import { SolutionContext } from "../components/context/SolutionContextProvider";
import { MemoryRouter } from "react-router-dom";
import Solution from "../components/solution/Solution";
import { SolutionLanguageContext } from "../components/context/SolutionLanguageProvider";
import { EditorThemeContext } from "../components/context/EditorThemeProvider";
import { LoginContext } from "../components/context/LoginContextProvider";

const MockSolutionPage = (props) => {
    const mockDojo = { id: 1, title: "Testdojo 1", description: "", difficulty: 1, url: "google.com", isDone: true };
    const mockSolution = { dojoId: 1, userId: 1, language: "python", code: "Code" };
    const mockLanguage = "python";
    const mockTheme = "monokai";

    const mockSetter = () => {
        return;
    };

    return (
        <MemoryRouter initialEntries={["/dojos/1"]}>
            <LoginContext.Provider value={{ isLoggedIn: true, setIsLoggedIn: mockSetter }}>
                <EditorThemeContext.Provider value={{ editorTheme: mockTheme, setEditorTheme: mockSetter }}>
                    <SolutionLanguageContext.Provider value={{ language: mockLanguage, setLanguage: mockSetter }}>
                        <SolutionContext.Provider
                            value={{
                                solution: mockSolution.code,
                                updateSolution: mockSetter,
                                setDojoId: mockSetter,
                                postSolution: mockSetter,
                            }}
                        >
                            <Solution dojo={mockDojo} />
                        </SolutionContext.Provider>
                    </SolutionLanguageContext.Provider>
                </EditorThemeContext.Provider>
            </LoginContext.Provider>
        </MemoryRouter>
    );
};

afterEach(cleanup);

describe("When the solutionpage is opened", () => {
    test("should contain the dojo title", () => {
        const { queryByText } = render(<MockSolutionPage />);

        expect(queryByText("Testdojo 1")).toBeInTheDocument();
    });

    test("should contain the save button", () => {
        const { queryByText } = render(<MockSolutionPage />);

        expect(queryByText(/Save/i)).toBeInTheDocument();
    });

    test("should contain the attempt button", () => {
        const { queryByText } = render(<MockSolutionPage />);

        expect(queryByText(/Attempt/i)).toBeInTheDocument();
    });

    test("should contain the theme setter drowpdown", () => {
        const { queryByTestId } = render(<MockSolutionPage />);

        expect(queryByTestId("theme-dropdown")).toBeInTheDocument();
    });

    test("should contain the language setter drowpdown", () => {
        const { queryByTestId } = render(<MockSolutionPage />);

        expect(queryByTestId("language-dropdown")).toBeInTheDocument();
    });
});

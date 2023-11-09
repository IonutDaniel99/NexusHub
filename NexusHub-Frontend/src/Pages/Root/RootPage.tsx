import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {delay} from "lodash";
import useLocalStorage from "../../hooks/useLocalStorage";
import {OnboardingUrl} from "../../config";
import useRootStore from "@/stores/RootStore";
import {Button} from "@/components/ui/button";

interface IUser {
    uuid_string: string;
    account_name: string;
}

function RootPage() {
    const navigate = useNavigate();
    const [isUserSaved, setUser] = useLocalStorage('current_user', null);
    const [isUserLogin, setUserLogin] = useLocalStorage('current_user_login', false);

    const [users, setUsers] = useState<IUser[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const setSelectedUser = useRootStore((state) => state.set_selected_user);
    const getSelectedUser = useRootStore((state) => state.selected_user);

    useEffect(() => {
        if (isUserSaved && isUserLogin) {
            navigate("/dashboard");
        } else {
            setLoading(false);
        }
    }, [isUserSaved, isUserLogin, navigate]);

    useEffect(() => {
        axios
            .get(OnboardingUrl + "/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setIsError(true);
                setErrorMessage("Error fetching users. Please try again.");
            });
    }, []);

    const handleUserChange = (user: IUser) => {
        setSelectedUser(user.uuid_string);
        setUser(user.uuid_string);
    };

    const handleJoinButton = () => {
        setLoading(true);
        delay(() => {
            if (isUserSaved) {
                setUserLogin(true);
                navigate("/dashboard");
            } else {
                setErrorMessage("An error occurred. Contact Administrator.");
                setLoading(false);
                setIsError(true);
            }
        }, 1500);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <div className="relative flex items-center justify-center w-screen h-screen bg-foreground text-background">
                <div className="flex flex-col items-center w-5/12 text-white h-4/6 justify-evenly">
                    <div className="w-40 h-40">
                        <img src={"https://via.placeholder.com/150"} alt="React Logo" className="w-full h-full"/>
                    </div>
                    <div className="flex w-full h-1/3 justify-evenly">
                        {isError && <span className="text-2xl font-medium ">{errorMessage}</span>}
                        {loading ? (
                            <span className="text-2xl font-medium text-white animate-pulse">Loading...</span>
                        ) : (
                            <div className="flex flex-col items-center w-full gap-6 justify-evenly">
                                <p className="font-medium">Select User</p>
                                <div className="grid grid-cols-3 grid-rows-3 gap-6">
                                    {users?.map((user, index) => (
                                        <Button
                                            key={index}
                                            type="button"
                                            variant={getSelectedUser !== user.uuid_string ? "default" : "secondary"}
                                            onClick={() => handleUserChange(user)}
                                        >
                                            {user.account_name}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex items-center w-full justify-evenly">
                                    <button type="button" className="slider-wizard-next-button"
                                            disabled={!getSelectedUser} onClick={handleJoinButton}>
                                        Join
                                    </button>
                                    {/*TODO*/}
                                    <Link to="/register" className="select-register-button-alternative">
                                        Register
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default RootPage;

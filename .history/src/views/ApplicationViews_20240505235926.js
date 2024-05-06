import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { Navbar } from "../navbar/Navbar"
import { Logout } from "../components/auth/Logout"
import AddGame from "../components/games/AddGame"
import GameList from "../components/games/Games"
import GameDetails from "../components/games/GameDetails"
import EditGame from "../components/games/EditGame"
import MyCollection from "../components/collections/MyCollection"
import AllUsersCollections from "../components/collections/Collections"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localGameCollectionUser = JSON.parse(localStorage.getItem("game_collection_user"))
        if (localGameCollectionUser) {
            setCurrentUser(localGameCollectionUser)
        }
    }, [])

    return (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route index element={<Welcome />} />
            <Route path="logout" element={<Logout />} />
            <Route path="add" element={<AddGame />} />
            <Route path="allgames" element={<GameList />} />
            <Route path="/game/:gameId" element={<GameDetails />} />
            <Route path="/edit-game/:gameId" element={<EditGame />} />
            <Route path="mycollection" element={<MyCollection userId={currentUser.userId} authToken={currentUser.authToken} />} />
            <Route path="/all-users-collections" element={<AllUsersCollections />} />
          
        </Route>

          
        </Routes>
      )
    }
    
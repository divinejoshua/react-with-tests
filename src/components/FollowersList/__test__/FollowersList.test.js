import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from "../FollowersList";
import fetchMock from 'jest-fetch-mock';
import axios from "axios"


const fakeFollowers = {
    data: {
        results: [
            {
                name: {
                    first: "Laith",
                    last: "Harb"
                },
                picture: {
                    large: "https://randomuser.me/api/portraits/men/59.jpg"
                },
                login: {
                    username: "ThePhonyGOAT"
                }
            },
        ]
    }
}

const MockFollowersList = () => {

    return (
        <BrowserRouter>
            <FollowersList/>
        </BrowserRouter>
    )
}


describe("FollowersList", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fetch and render input element', async () => {


        const mockedAxios = fakeFollowers
        jest.spyOn(axios, 'get').mockResolvedValueOnce(mockedAxios);

        render(
            <MockFollowersList/>
        );

        // Find the followers list
        const followerDivElement = await screen.findByTestId(`follower-item-0`)
        expect(followerDivElement).toBeInTheDocument();

        // Find the profile image
        const imageElement = await screen.findByAltText(`profileImage-0`)
        expect(imageElement).toBeInTheDocument();

        // Find the first name from the mock data 
        const firstNameElement = await screen.findByTitle(`Laith`)
        expect(firstNameElement).toBeInTheDocument();
    });

})
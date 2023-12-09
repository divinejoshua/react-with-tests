import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from "../FollowersList";
import axios from "axios"

// eslint-disable-next-line jest/no-mocks-import
import fakeFollowers from '../../../__mocks__/followers.json'



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


    // It test that the followes list should be displayed with the right data
    it('should fetch and render input element', async () => {

        // Mock the request
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
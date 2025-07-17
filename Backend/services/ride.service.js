import rideModel from "../models/ride.model.js";
import { calculateDistanceAndTime } from './maps.service.js';
import bcrypt from "bcrypt";
import crypto from 'crypto';

async function getFare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await calculateDistanceAndTime(pickup, destination);
    let { distance, duration } = distanceTime;
    distance = parseFloat(distance);  
    duration = parseFloat(duration);
    // console.log(distance, duration);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fares = {
        auto: baseFare.auto + perKmRate.auto * distance + perMinuteRate.auto * duration,
        car: baseFare.car + perKmRate.car * distance + perMinuteRate.car * duration,
        moto: baseFare.moto + perKmRate.moto * distance + perMinuteRate.moto * duration
    };

    return fares;
}

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


export const createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });
    return ride;
};


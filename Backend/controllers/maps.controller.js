import { getAddressCoordinate, calculateDistanceAndTime, getAutoSuggestions } from '../services/maps.service.js';
import { validationResult } from 'express-validator';

export const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: 'Coordinates not found' });
  }
};

export const getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    try {
        const result = await calculateDistanceAndTime(origin, destination);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating distance and time' });
    }
};

export const getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    try {
        const suggestions = await getAutoSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching autocomplete suggestions' });
    }
};
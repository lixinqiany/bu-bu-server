import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
    private readonly ANTHROPIC_BASE_URL = "https://chat.appexnetworks.com/open-api/v1/relay/anthropic/v1/models";
    private readonly OPENAI_BASE_URL = "https://chat.appexnetworks.com/open-api/v1/relay/openai/v1/models";
    private readonly API_KEY = "sk-at-10789555983862555a019807b9227be90e8e59b3fd49720dd34b54987ecf8b97";

    public async getClaudeModels() {
        const {data:{data: models}} = await axios.get(this.ANTHROPIC_BASE_URL, {
            headers: {
                "x-api-key": `${this.API_KEY}`
            }
        })

        models.forEach(model => {
            model.provider = "anthropic";
        })

        return models;
    }

    public async getOpenaiModels() {
        const {data:{data: models}} = await axios.get(this.OPENAI_BASE_URL, {
            headers: {
                "Authorization": `Bearer ${this.API_KEY}`
            }
        })

        models.forEach(model => {
            model.provider = "openai";
        })

        return models;
    }
}
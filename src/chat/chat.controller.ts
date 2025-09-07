import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) {}

    @Get("v1/models")
    public async getModels() {
        const [anthropicModels, openaiModels] = await Promise.all([
            this.chatService.getClaudeModels(), 
            this.chatService.getOpenaiModels()
        ]);
        
        return [...anthropicModels, ...openaiModels ]; 
    }
}

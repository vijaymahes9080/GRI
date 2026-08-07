import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';

class AIChatScreen extends StatefulWidget {
  const AIChatScreen({super.key});

  @override
  State<AIChatScreen> createState() => _AIChatScreenState();
}

class _AIChatScreenState extends State<AIChatScreen> {
  final List<Map<String, String>> _messages = [
    {
      'role': 'assistant',
      'text': 'Hello Vijay! I am GRI AI Assistant. Ask me anything about university regulations, courses, fees, or hostel out-pass rules.'
    }
  ];
  final TextEditingController _controller = TextEditingController();

  void _sendMessage() {
    if (_controller.text.trim().isEmpty) return;

    final text = _controller.text.trim();
    setState(() {
      _messages.add({'role': 'user', 'text': text});
      _controller.clear();
    });

    // Mock RAG AI response
    Future.delayed(const Duration(milliseconds: 800), () {
      setState(() {
        _messages.add({
          'role': 'assistant',
          'text': 'Based on GRI Ordinance 2025: Out-pass applications must be submitted 24h in advance via the mobile portal with parent SMS approval.\n[Source: Hostel_Regulations_2025.pdf]'
        });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GRI AI Assistant (RAG)'),
        backgroundColor: AppColors.primaryMaroon,
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isUser = msg['role'] == 'user';
                return Align(
                  alignment:
                      isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 4),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isUser
                          ? AppColors.primaryMaroon
                          : AppColors.secondaryGreen.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      msg['text']!,
                      style: TextStyle(
                        color: isUser ? Colors.white : Colors.black87,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Ask GRI AI Assistant...',
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: AppColors.primaryMaroon),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

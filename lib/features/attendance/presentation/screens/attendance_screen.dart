import 'package:flutter/material.dart';
import '../../../../core/constants/app_colors.dart';

class AttendanceScreen extends StatelessWidget {
  const AttendanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Attendance Management'),
        backgroundColor: AppColors.secondaryGreen,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Card(
              color: AppColors.secondaryGreen,
              child: const Padding(
                padding: EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Overall Attendance',
                          style: TextStyle(color: Colors.white70),
                        ),
                        SizedBox(height: 4),
                        Text(
                          '89.5%',
                          style: TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    Icon(Icons.verified, size: 48, color: Colors.white),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView(
                children: const [
                  ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.green,
                      child: Icon(Icons.check, color: Colors.white),
                    ),
                    title: Text('Data Structures & Algorithms'),
                    subtitle: Text('Present • 09:30 AM - Room CS-102'),
                    trailing: Text('92%'),
                  ),
                  Divider(),
                  ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.green,
                      child: Icon(Icons.check, color: Colors.white),
                    ),
                    title: Text('AI & Machine Learning'),
                    subtitle: Text('Present • 11:15 AM - Lab 3'),
                    trailing: Text('88%'),
                  ),
                  Divider(),
                  ListTile(
                    leading: CircleAvatar(
                      backgroundColor: Colors.red,
                      child: Icon(Icons.close, color: Colors.white),
                    ),
                    title: Text('Environmental Science'),
                    subtitle: Text('Absent • 02:00 PM - Hall B'),
                    trailing: Text('78%'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

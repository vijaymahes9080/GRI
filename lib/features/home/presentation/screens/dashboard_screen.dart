import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../auth/presentation/providers/auth_provider.dart';
import '../../../../core/constants/app_colors.dart';

class DashboardScreen extends ConsumerStatefulWidget {
  const DashboardScreen({super.key});

  @override
  ConsumerState<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends ConsumerState<DashboardScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authProvider).user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('GRI Student Portal'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => ref.read(authProvider.notifier).logout(),
          ),
        ],
      ),
      body: _selectedIndex == 0
          ? SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Card(
                    color: AppColors.primaryMaroon,
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Welcome, ${user?.firstName ?? "Student"} ${user?.lastName ?? ""}',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '${user?.department ?? "Academic Department"} | Roll: ${user?.rollNumber ?? "N/A"}',
                            style: const TextStyle(color: Colors.white70),
                          ),
                          const SizedBox(height: 12),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: AppColors.accentAmber,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Text(
                              'CGPA: 8.92 (Sem VI)',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    'Quick Services',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 12),
                  GridView.count(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    children: [
                      _buildQuickAction(
                        icon: Icons.qr_code,
                        label: 'Digital Smart ID',
                        color: AppColors.primaryMaroon,
                        onTap: () {},
                      ),
                      _buildQuickAction(
                        icon: Icons.check_circle_outline,
                        label: 'Attendance (89%)',
                        color: AppColors.secondaryGreen,
                        onTap: () {},
                      ),
                      _buildQuickAction(
                        icon: Icons.assignment_outlined,
                        label: 'Exam Results',
                        color: AppColors.accentAmber,
                        onTap: () {},
                      ),
                      _buildQuickAction(
                        icon: Icons.meeting_room_outlined,
                        label: 'Hostel Out-Pass',
                        color: Colors.purple,
                        onTap: () {},
                      ),
                    ],
                  ),
                ],
              ),
            )
          : Center(
              child: Text('Tab index: $_selectedIndex'),
            ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(
              icon: Icon(Icons.school), label: 'Academics'),
          NavigationDestination(
              icon: Icon(Icons.smart_toy), label: 'AI Chat'),
          NavigationDestination(
              icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }

  Widget _buildQuickAction({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Card(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircleAvatar(
              backgroundColor: color.withOpacity(0.15),
              radius: 28,
              child: Icon(icon, color: color, size: 30),
            ),
            const SizedBox(height: 12),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}

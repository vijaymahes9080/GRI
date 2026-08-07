/// Domain entity representing a user in the GRI application
class UserModel {
  final String id;
  final String email;
  final String role; // student, faculty, parent, admin
  final String firstName;
  final String lastName;
  final String? department;
  final String? rollNumber;

  const UserModel({
    required this.id,
    required this.email,
    required this.role,
    required this.firstName,
    required this.lastName,
    this.department,
    this.rollNumber,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      role: json['role'] ?? 'student',
      firstName: json['first_name'] ?? '',
      lastName: json['last_name'] ?? '',
      department: json['department'],
      rollNumber: json['roll_number'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'role': role,
      'first_name': firstName,
      'last_name': lastName,
      'department': department,
      'roll_number': rollNumber,
    };
  }
}

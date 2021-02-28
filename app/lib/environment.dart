import 'dart:core';

class Environment {
  final String id;
  final double temperature;
  final double humidity;
  final String createdAt;

  Environment({this.id, this.temperature, this.humidity, this.createdAt});

  factory Environment.fromJson(Map<String, dynamic> json) {
    return Environment(
        id: json['id'],
        temperature: double.parse(json['temperature'].toString()),
        humidity: double.parse(json['humidity'].toString()),
        createdAt: json['created_at']);
  }
}

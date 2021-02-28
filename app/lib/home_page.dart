import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:http/http.dart' as http;
import 'package:timer_builder/timer_builder.dart';
import 'dart:convert';

import 'package:wireless_env_monitor/environment.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TimerBuilder.periodic(Duration(seconds: 5), builder: (context) {
      return Scaffold(
        appBar: AppBar(
          title: Text(
            'Environment Monitor',
          ),
          centerTitle: true,
        ),
        body: _body(),
      );
    });
  }

  _body() {
    return Container(
      color: Colors.white,
      child: Center(
        child: _showEnvData(),
      ),
    );
  }

  _showEnvData() {
    return FutureBuilder<Environment>(
        future: _getData(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return new ListView(
              itemExtent: 200,
              scrollDirection: Axis.vertical,
              shrinkWrap: true,
              padding: EdgeInsets.all(20),
              children: <Widget>[
                _envIndicator(
                    "Temperature", snapshot.data.temperature, "°C", 50),
                _envIndicator("Humidity", snapshot.data.humidity, "%", 100),
                Text(
                  'Last Environment Measurement:\n${_getFormattedDate(snapshot.data.createdAt)}',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                )
              ],
            );
          } else {
            return new ListView(
              itemExtent: 200,
              scrollDirection: Axis.vertical,
              shrinkWrap: true,
              padding: EdgeInsets.all(20),
              children: <Widget>[],
            );
          }
        });
  }
}

CircularPercentIndicator _envIndicator(
    String title, double value, String unit, double max) {
  Color color =
      title == "Temperature" ? _getTempColor(value) : _getHumColor(value);
  return new CircularPercentIndicator(
    radius: 120.0,
    lineWidth: 13.0,
    animation: true,
    percent: ((value * 100) / max) / 100,
    header: new Text(
      title,
      style: new TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 20.0,
      ),
    ),
    center: new Text(
      '$value$unit',
      style: new TextStyle(
        fontWeight: FontWeight.bold,
        fontSize: 20.0,
      ),
    ),
    circularStrokeCap: CircularStrokeCap.round,
    progressColor: color,
  );
}

Color _getTempColor(double temp) {
  if (temp >= 0 && temp < 29.9) {
    return Colors.blue;
  }
  if (temp >= 30 && temp < 39.9) {
    return Colors.yellow;
  }
  return Colors.red;
}

Color _getHumColor(double hum) {
  if (hum >= 0 && hum < 31) {
    return Colors.red;
  }
  if (hum >= 31 && hum < 50) {
    return Colors.yellow;
  }
  return Colors.blue;
}

Future<Environment> _getData() async {
  var url = 'http://192.168.1.10/environments/last';
  var response = await http.get(url);
  if (response.statusCode == 200) {
    return Environment.fromJson(json.decode(response.body));
  }
  return Environment.fromJson(json.decode('{'
      '"id": "123", '
      '"temperature": 0, '
      '"humidity": 0, '
      '"created_at":"${DateTime.now().toUtc()}"'
      '}'));
}

String _getFormattedDate(String isoDate) {
  var d = DateTime.parse(isoDate).subtract(Duration(hours: 3));
  return '${_round(d.day)}/'
      '${_round(d.month)}/'
      '${d.year} - '
      '${_round(d.hour)}:'
      '${_round(d.minute)}:'
      '${_round(d.second)}';
}

String _round(int number) {
  return '${number < 10 ? '0${number}' : number}';
}
